import React, { useRef } from "react";
import "./App.css";
import { useState } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [Msg, setMsg] = useState("Upload Xlsx files here");
  const [selectedFile, setSelectedFile] = useState(undefined)
  const fileInputRef = useRef(null);
  
  const handleFileUpload = async (event) => {
    const tmp = event.target.files[0]
    setSelectedFile(event.target.files[0]);
   // console.log(selectedFile);
   console.log(tmp)
    if(event.target.files[0] === undefined) return;
    setMsg(tmp.name);
    console.log(Msg)
  };
  const onSubmit = async () => {
    const formData = new FormData();
    console.log('selected file ,' , selectedFile)
    if(selectedFile === undefined) {
      //console.log(selectedFile) 
      setMsg('Error')
       return;
    }
    formData.append("file", selectedFile);
    try{
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://excelupload-server.onrender.com/upload",
        headers: {
          "Content-Type": formData.get('Content-Type')
        },
        data: formData,
      };

      const resp = await axios.request(config)
      console.log(resp)
    }
    catch(error)
    {
      console.log(error)
      setMsg('Error')
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="App">
      <div className="heading">Add Candidates to Database</div>
      <div className="container">
        <input
          type="file"
          ref={fileInputRef}
          accept=".xlsx"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <button onClick={handleClick} className="upload">
          <FontAwesomeIcon icon={faUpload} size="2xl"></FontAwesomeIcon>
        </button>
        <br></br>
        <button className="submit" onClick={onSubmit}  style={{ display: selectedFile ? "inline-block" : "none" }}>Submit</button>
      </div>
      <div>{Msg}</div>
    </div>
  );
}

export default App;
