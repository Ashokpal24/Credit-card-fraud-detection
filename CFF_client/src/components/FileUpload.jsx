import React, { useState, useRef } from "react";
import axios from "axios";
import DataTable from "./DataTable";

import {
  Button,
  createTheme,
  alpha,
  getContrastRatio,
  ThemeProvider,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

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
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setLoadedData(data["data"]);
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

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="violet" sx={{ mb: 2}}>
        <Toolbar>
          <Typography variant="h4" sx={{ color: "#263238" }}>
            🔎 Credit Card Fraud
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#263238" }}>
          Upload data
        </Typography>
        <div>
          <Button
            component="label"
            variant="contained"
            color="violet"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            {selectedFile ? selectedFile.name : "Upload file"}
            <input
              type="file"
              accept=".json"
              style={{ display: "none", color: "#263238" }}
              onChange={handleFileChange}
              ref={inputRef}
              onClick={handleButtonClick}
            />
          </Button>
        </div>
        <div>
          {loadeddata ? (
            <Button
              variant="contained"
              color="violet"
              onClick={handleFileUpload}
              sx={{ mb: 4, color: "#263238" }}
            >
              🔎 Predict
            </Button>
          ) : (
            <Typography>No file added..</Typography>
          )}
        </div>
      </Container>

      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          mt: 0,
          pt: 0,
        }}
      >
        <Grid item md={7}>
          {selectedFile && loadeddata ? (
            <DataTable data={loadeddata} columns={columnNames} />
          ) : (
            ""
          )}
        </Grid>
        <Grid item md={2} sx={{ mb: "15px" }}>
          {results ? <DataTable data={results} columns={["Results"]} /> : ""}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default FileUpload;
