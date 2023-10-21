import React, { useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://animated-invention-9rv667x9953p7j4-5000.app.github.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = (event) => {
      const fileContent = event.target.result;

      try {
        const jsonPayload = JSON.parse(fileContent);
        axiosInstance
          .post("/predict", jsonPayload)
          .then((response) => {
            const data = response.data;
            console.log(data);
            setResults(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
  };
  return (
    <>
      <h1>Upload data</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <br />
      <br />
      {selectedFile ? (
        <button onClick={handleFileUpload}>upload</button>
      ) : (
        "No file added.."
      )}
      <br />
      <br />
      {results
        ? results.map((value, index) => (
            <h4 key={index}>
              {index}:{value}
            </h4>
          ))
        : ""}
    </>
  );
};
export default FileUpload;
