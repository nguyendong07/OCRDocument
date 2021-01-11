import React, { Component } from 'react';

class ocrDocument extends Component {
    render() {
        return (
            <div >
                <div>
                 <h1 style={{backgroundColor: "lightblue"}}>Hello Style!</h1>
            <p>Add a little style!</p>
      </div>
                {/* <h3 style = {{}}>Thông tin văn bản</h3>
                <div className = "content" style = {{display:"flex"}}>
                    <button name =  "Xem vùng OCR"></button>
                    <button name = "Chọn tệp">Không có tệp nào được chọn</button>
                    <div className =  "Information" style = {{flexDirection : "row"}}>
                        <p>Số, ký hiệu</p><input type =  "text" multiple = "true"></input>
                        <p>Thời gian</p><input type =  "text" multiple = "true"></input>
                        <p>Tên văn bản</p><input type =  "text" multiple = "true"></input>
                        <p>Tác giả</p><input type =  "text" multiple = "true"></input>
                    </div>
                </div> */}
            </div>
        );
    }
}
export default ocrDocument;

