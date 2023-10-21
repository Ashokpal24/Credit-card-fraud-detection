import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";

const axiosInstance = axios.create({
  baseURL: "https://animated-invention-9rv667x9953p7j4-5000.app.github.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

const columnNames = [
  "Time",
  "V1",
  "V2",
  "V3",
  "V4",
  "V5",
  "V6",
  "V7",
  "V8",
  "V9",
  "V10",
  "V11",
  "V12",
  "V13",
  "V14",
  "V15",
  "V16",
  "V17",
  "V18",
  "V19",
  "V20",
  "V21",
  "V22",
  "V23",
  "V24",
  "V25",
  "V26",
  "V27",
  "V28",
  "Amount",
];

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadeddata, setLoadedData] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setLoadedData(data["data"]);
          console.log(data["data"]);
          console.log(columnNames);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(file);
    }
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
      {loadeddata ? (
        <button onClick={handleFileUpload}>upload</button>
      ) : (
        "No file added.."
      )}
      <br />
      {selectedFile && loadeddata ? (
        <DataTable data={loadeddata} columns={columnNames} />
      ) : (
        ""
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
