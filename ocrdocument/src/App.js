/* eslint-disable jsx-a11y/iframe-has-title */
import logo from './logo.svg';
import './App.css';

function App() {
  var w = window.innerWidth
  return (
    <div className="App" style = {{flexDirection : "row"}}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className = "header" style = {{float : "left"}}>
        <div style = {{float : "left", marginLeft : "10px"}}>
        <p style = {{color : "#50D7F2", fontSize : "17px", paddingRight : "350px"}}>Thông tin văn bản</p>
        <div style = {{flexDirection : "column"}}>
        <button style = {{marginBottom : "10px",  marginRight : "10px" ,padding: "6px", color : "white", backgroundColor: "#F0AD4E", borderRadius : "4px",border : "none"}}>Xem vùng thông tin OCR</button>
        <button style = {{marginBottom : "10px", marginRight : "10px",padding: "6px", color : "white", backgroundColor: "#337ab7", borderRadius : "4px",border : "none"}}>OCR tự động</button>
        <button style = {{marginBottom : "10px", marginRight : "10px",padding: "6px", color : "white", backgroundColor: "#337ab7", borderRadius : "4px",border : "none"}}>OCR chỉnh tay</button>
        <button style = {{marginBottom : "10px", marginRight : "10px",padding: "6px", color : "white", backgroundColor: "#337ab7", borderRadius : "4px",border : "none"}}>Thêm vùng</button>
        <button style = {{marginBottom : "10px", padding: "6px", color : "white", backgroundColor: "#337ab7",borderRadius : "4px", border : "none"}}>Lưu mẫu</button>
        </div>
        </div>
        <div style = {{marginLeft : "30px"}}><iframe style = {{height: "700px", width : "1000px", border: "1px solid black"}}></iframe></div>
      </div>
        <div className =  "ocrinf" style = {{flexDirection : "row", float : "right", marginTop : "5%", marginRight : "7%"}}>
          <div style = {{flexDirection : "column"}}>
            <div style = {{float : "right"}}><button>Chọn file</button></div>
            <div className = "dropfile" style = {{height : "60px", width : "200px", border : "1px dashed lightgray", backgroundColor : "#f5f5f5", paddingTop : "10px"}}>Kéo file vào đây</div>
          </div>
            <p style = {{ color : "#046eb5", fontWeight : "bold"}}>Số, ký hiệu:<input style = {{height : "30px", width : "450px",marginLeft : "10px", border : "1px solid #ccc"}} autoFocus = {false}></input></p>
            <p style = {{ color : "#046eb5", fontWeight : "bold"}}>Ngày cấp:<input style = {{height : "30px", width : "450px",marginLeft : "19px",  border : "1px solid #ccc"}}></input></p>
            <p style = {{ color : "#046eb5", fontWeight : "bold"}}>Tên văn bản:<input style = {{height : "30px", width : "450px",marginLeft : "4px", border : "1px solid #ccc"}}></input></p>
            <p style = {{ color : "#046eb5", fontWeight : "bold"}}>Địa điểm:<input style = {{height : "70px", width : "450px",marginLeft : "25px", border : "1px solid #ccc"}}></input></p>
            <div className = "button" style = {{float : "right"}}>
            <button style = {{marginRight : "10px", padding : "8px" ,backgroundColor : "#337ab7", color : "white" ,  borderRadius : "4px", border : "none"}}>Ghi nhận</button>
            <button style = {{padding : "8px" ,backgroundColor : "#F0AD4E", color : "white" ,  borderRadius : "4px", border : "none"}}>Quay về</button>
            </div>
        </div>
    </div>
  );
}

export default App;
