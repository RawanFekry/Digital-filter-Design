import React, { useState } from "react";

// Upload and read csv files
function App() {
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
          fileReader.onload = function (event) {
              const csvOutput = event.target.result;
          };
          fileReader.readAsText(file);
      }
  };

  return (
      <div style={{ textAlign: "center" }}>
          <form>
              <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />  
              <button onClick={(e) => {handleOnSubmit(e);}}>IMPORT CSV</button>    
          </form>
      </div>
  );
}