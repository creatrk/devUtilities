import React, { useState } from "react";
import "./JsonToCsv.css";

const JsonToCsvConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleConvert = () => {
    try {
      const jsonArray = JSON.parse(jsonInput);

      if (!Array.isArray(jsonArray)) {
        alert("JSON should be an array of objects.");
        return;
      }

      const keys = Object.keys(jsonArray[0]);
      const csvRows = jsonArray.map(obj =>
        keys.map(key => JSON.stringify(obj[key] ?? "")).join(",")
      );

      setHeaders(keys);
      setCsvData(csvRows);
    } catch (err) {
      alert("Invalid JSON");
      console.error(err);
    }
  };

  const handleDownload = () => {
    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h2>JSON to CSV Converter</h2>
      <textarea
        value={jsonInput}
        onChange={e => setJsonInput(e.target.value)}
        placeholder="Paste your JSON array here..."
      />
      <div>
        <button onClick={handleConvert}>Convert</button>
        {csvData.length > 0 && (
          <button onClick={handleDownload}>Download CSV</button>
        )}
      </div>

      {csvData.length > 0 && (
        <>
          <h3>CSV Preview</h3>
          <table>
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, idx) => (
                <tr key={idx}>
                  {row.split(",").map((cell, cidx) => (
                    <td key={cidx}>{cell.replace(/^"|"$/g, "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default JsonToCsvConverter;
