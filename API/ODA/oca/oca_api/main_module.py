import pytesseract
import cv2
import numpy as np
from pdf2image import convert_from_bytes
from pdf2image.exceptions import (
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError
)
import torch
import detecto
import os
import utils
from PIL import Image


def non_max_suppression_fast(boxes, labels, overlapThresh):
    # if there are no boxes, return an empty list
    if len(boxes) == 0:
        return []

    # if the bounding boxes integers, convert them to floats --
    # this is important since we'll be doing a bunch of divisions
    if boxes.dtype.kind == "i":
        boxes = boxes.astype("float")
    #
    # initialize the list of picked indexes
    pick = []

    # grab the coordinates of the bounding boxes
    x1 = boxes[:, 0]
    y1 = boxes[:, 1]
    x2 = boxes[:, 2]
    y2 = boxes[:, 3]

    # compute the area of the bounding boxes and sort the bounding
    # boxes by the bottom-right y-coordinate of the bounding box
    area = (x2 - x1 + 1) * (y2 - y1 + 1)
    idxs = np.argsort(area)

    # keep looping while some indexes still remain in the indexes
    # list
    while len(idxs) > 0:
        # grab the last index in the indexes list and add the
        # index value to the list of picked indexes
        last = len(idxs) - 1
        i = idxs[last]
        pick.append(i)

        # find the largest (x, y) coordinates for the start of
        # the bounding box and the smallest (x, y) coordinates
        # for the end of the bounding box
        xx1 = np.maximum(x1[i], x1[idxs[:last]])
        yy1 = np.maximum(y1[i], y1[idxs[:last]])
        xx2 = np.minimum(x2[i], x2[idxs[:last]])
        yy2 = np.minimum(y2[i], y2[idxs[:last]])

        # compute the width and height of the bounding box
        w = np.maximum(0, xx2 - xx1 + 1)
        h = np.maximum(0, yy2 - yy1 + 1)

        # compute the ratio of overlap
        overlap = (w * h) / area[idxs[:last]]

        # delete all indexes from the index list that have
        idxs = np.delete(idxs, np.concatenate(([last],
                                               np.where(overlap > overlapThresh)[0])))

    # return only the bounding boxes that were picked using the
    # integer data type

    final_labels = [labels[idx] for idx in pick]
    final_boxes = boxes[pick].astype("int")
    return final_boxes, final_labels


real_h = 24.5
real_w = 15.5


# crop text area
def CropTextArea(image, coordinate, H, W):
    return image[coordinate[0]:coordinate[0] + W, coordinate[1]:coordinate[1] + H]


def CaculateNumberFrame(h, w):
    coordinate = (np.int32((5.5 / real_w) * w), np.int32((10.5 / real_h) * h))
    width = np.int32(2.5 / real_w * w)
    height = np.int32(11 / real_h * h)
    return (coordinate, height, width)


def CaculateDateFrame(h, w):
    coordinate = (np.int32((4 / real_w) * w), np.int32((10.5 / real_h) * h))
    width = np.int32(2 / real_w * w)
    height = np.int32(11 / real_h * h)
    return (coordinate, height, width)


def CaculateNameFrame(h, w):
    coordinate = (np.int32((8 / real_w) * w), np.int32((12 / real_h) * h))
    width = np.int32(1.5 / real_w * w)
    height = np.int32(11 / real_h * h)
    return (coordinate, height, width)


def Main(path):
    byte = bytes(path.read())
    outputDir = 'image/'
    pages = convert_from_bytes(byte)
    count = 0
    filename = outputDir + str(path)[:str(path).rindex('.')] + '_' + str(count) + '.jpg'
    pages[0].save(filename)
    res = OCR(filename)
    os.remove(filename)
    print(filename)
    return res


def OCR(filename):
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    image = cv2.imread(filename)
    custom_config = r'--oem 3 --psm 6 lang = vie'
    iHeight = image.shape[1]
    iWidth = image.shape[0]
    (coordinate, height, width) = CaculateNumberFrame(iHeight, iWidth)
    (coordinate1, height2, width2) = CaculateNameFrame(iHeight, iWidth)
    (coordinate3, height3, width3) = CaculateDateFrame(iHeight, iWidth)
    im = Image.open(filename)
    img_height = image.shape[0]
    img_width = image.shape[1]
    left_number = img_width * 0.15
    top_number = img_height * 0.1
    right_number = img_width * 0.4
    bottom_number = img_height*0.15
    img_number = im.crop((left_number, top_number, right_number, bottom_number))


    left_date = img_width * 0.4
    top_date = img_height * 0.12
    right_date = img_width * 1
    bottom_date = img_height * 0.15
    img_date = im.crop((left_date, top_date, right_date, bottom_date))

    left_name = img_width * 0.1
    top_name = img_height * 0.18
    right_name = img_width * 1
    bottom_name = img_height * 0.3
    img_name = im.crop((left_name, top_name, right_name, bottom_name))
    img_name.show()

    number = pytesseract.image_to_string(img_number, lang='vie')
    name = pytesseract.image_to_string(img_name, lang= 'vie')
    date = pytesseract.image_to_string(img_date, lang="vie")
    print(date)
    return ({
        'so_ki_hieu': number,
        'ngay_thang': date,
        'ten_van_ban':name
    })
