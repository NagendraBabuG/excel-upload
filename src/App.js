import React, { useRef } from "react";
import "./App.css";
import { useState } from "react";

import axios from "axios";
import Response from "./components/response/response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUpload } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [msg, setMsg] = useState("Upload Xlsx files here");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isUploaded, setIsUploaded] = useState(false);
  const [respond, setRespond] = useState(400)
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const tmp = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    console.log(tmp);
    
    if (event.target.files[0] === undefined) return;
    setMsg(tmp.name);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    console.log("selected file ,", selectedFile);
    if (selectedFile === undefined) {
      setMsg("Error");
      return;
    }
    formData.append("file", selectedFile);
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://excelupload-backend-production.up.railway.app/upload",
            headers: {
              "Content-Type": formData.get('Content-Type')
            },
            data: formData,
          };

      const resp = await axios.request(config);
      setRespond(resp.status)
      console.log(resp.status)
      setIsUploaded(true)
      console.log(resp);
    } catch (error) {
      console.log(error);
      setMsg("Error");
      setRespond(400)
      setIsUploaded(true)
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <div className="navbar"><h3>Add From Excel</h3></div>
      <div className="heading">Add Candidates to Database</div>
      
      <div className="container">
      { isUploaded ? <Response status = {respond}></Response>: <div>

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
        <button className="submit" onClick={onSubmit} style={{ display: selectedFile ? "inline-block" : "none" }}>
          Submit
        </button>
       </div>}
      </div>
     {!isUploaded && <div>{msg}</div>}
    </div>
  );
}

export default App;
