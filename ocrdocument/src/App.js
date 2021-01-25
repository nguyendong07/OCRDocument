/* eslint-disable jsx-a11y/iframe-has-title */
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from "react";
const instance = axios.create();
const App = () => {
  const [fileList, setFileList] = useState('')
  const [url, seturl] = useState('')
  const [date, setDate] = useState('')
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')

  const requestPOST = async (URL, data) => {
    let formData = new FormData()
    formData.append('src', data)
    return await instance({
      method: "POST",
      headers: { "Content-Type": 'multipart/form-data' },
      url: URL,
      data: formData,
      timeout: 15000,
    })
      .then(function (response) {
        console.log(response.data)
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  return (
    <div className="App" style={{ flexDirection: "row" }}>
      <div className="header" style={{ float: "left" }}>
        <div style={{ float: "left", marginLeft: "10px" }}>
          <p style={{ color: "#50D7F2", fontSize: "17px", paddingRight: "350px" }}>Thông tin văn bản</p>
          <div style={{ flexDirection: "row", display: 'flex' }}>
            <button id="button1"
              style={{ marginBottom: "10px", marginRight: "10px", padding: "6px", color: "white", backgroundColor: "#F0AD4E", borderRadius: "4px", border: "none" }}>Xem vùng thông tin OCR</button>
            <button
              style={{ display: 'inline', marginBottom: "10px", marginRight: "10px", padding: "6px", color: "white", backgroundColor: "#337ab7", borderRadius: "4px", border: "none" }}
              onClick={async () => {
                const url = 'http://127.0.0.1:8000/OCR'
                var data = fileList
                const res = await requestPOST(url, data)
                console.log(res)
                setNumber(res.data.so_ki_hieu)
                setDate(res.data.ngay_thang)
                setName(res.data.ten_van_ban)
              }}
            >OCR tự động</button>
            <button
              style={{ marginBottom: "10px", marginRight: "10px", padding: "6px", color: "white", backgroundColor: "#337ab7", borderRadius: "4px", border: "none" }}>OCR chỉnh tay</button>
            <button
              style={{ marginBottom: "10px", marginRight: "10px", padding: "6px", color: "white", backgroundColor: "#337ab7", borderRadius: "4px", border: "none" }}>Thêm vùng</button>
            <button
              style={{ marginBottom: "10px", padding: "6px", color: "white", backgroundColor: "#337ab7", borderRadius: "4px", border: "none" }}>Lưu mẫu</button>
          </div>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <iframe  src = {url} style={{ height: "700px", width: "1000px", border: "1px solid black" }}>
          </iframe>
          </div>
      </div>
      <div className="ocrinf" style={{ flexDirection: "row", float: "right", marginTop: "5%", marginRight: "7%" }}>
        <div style={{ flexDirection: "column" }}>
          <div style={{ float: "right" }}>
            {/* <Upload
              accept="text/plain, application/pdf, .csv, .docx, .xlsx"
              name="files"
              //multiple={​​​​​​​​false}​​​​​​​​
              fileList={fileList}
              action={`http://192.168.2.128:3344/v0/attachment/files`}
              showUploadList={false}
              onChange={files => {
                
                if (files.file.status !== 'uploading') {
                  //   console.log(files.file, files.fileList);
                }
                if (files.file.status === 'done') {
                  // console.log(files.file)
                  console.log('THANH CONG');
                  console.log(files);
                  var temp = [];
                  temp.push(files.file.response)
                  setFileList(temp)
                } else if (files.file.status === 'error') {
                  console.log('LOI');
                }
                //    onInputFileListChange(files);
              }}
            >
              <Button size="small">
                Chọn
              </Button>
            </Upload> */}
            <form>
              <label>
              </label>
              <input type="file" onChange={(e) => {
                setFileList(e.target.files[0])
                console.log(url)
              }
              } />
            </form>
          </div>
          <div className="dropfile" style={{ height: "60px", width: "200px", border: "1px dashed lightgray", backgroundColor: "#f5f5f5", paddingTop: "10px" }}>Kéo file vào đây</div>
        </div>
        <p style={{ color: "#046eb5", fontWeight: "bold" }}>Số, ký hiệu:<input value={number ? number : ''} onChange={(e) => { setNumber(e.target.value) }} style={{ height: "30px", width: "450px", marginLeft: "10px", border: "1px solid #ccc" }} autoFocus={false}></input></p>
        <p style={{ color: "#046eb5", fontWeight: "bold" }}>Ngày cấp:<input value={date ? date : ''} onChange={(e) => { setDate(e.target.value) }} style={{ height: "30px", width: "450px", marginLeft: "19px", border: "1px solid #ccc" }}></input></p>
        <p style={{ color: "#046eb5", fontWeight: "bold" }}>Tên văn bản:<input value={name ? name : ''} onChange={(e) => { setName(e.target.value) }} style={{ height: "30px", width: "450px", marginLeft: "4px", border: "1px solid #ccc" }}></input></p>
        <p style={{ color: "#046eb5", fontWeight: "bold" }}>Địa điểm:<input style={{ height: "70px", width: "450px", marginLeft: "25px", border: "1px solid #ccc", textAlign: 'start' }}></input></p>
        <div className="button-confirm" style={{ float: "right" }}>
          <button style={{ marginRight: "10px", padding: "8px", backgroundColor: "#337ab7", color: "white", borderRadius: "4px", border: "none" }}>Ghi nhận</button>
          <button style={{ padding: "8px", backgroundColor: "#F0AD4E", color: "white", borderRadius: "4px", border: "none" }}>Quay về</button>
        </div>
      </div>
    </div>
  );
}

export default App;
