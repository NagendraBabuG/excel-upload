import React, { useRef } from "react";
import "./App.css";
import { useState } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [Msg, setMsg] = useState("Upload Xlsx files here");
  const fileInputRef = useRef(null);
  let selectedFile = undefined;
  const handleFileUpload = async (event) => {
    selectedFile = event.target.files[0];
    console.log(selectedFile);
    setMsg(selectedFile.name);
  };
  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://excelupload-server.onrender.com/upload",
        headers: {
          ...formData.getHeaders(),
        },
        data: formData,
      };

      const resp = await axios.request(config)
      console.log(resp)
      
    } catch (error) {
      console.error(error);
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
        <button className="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
      <div>{Msg}</div>
    </div>
  );
}

export default App;
