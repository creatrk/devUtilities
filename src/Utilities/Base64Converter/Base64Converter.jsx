import React, { useState } from "react";
import "./Base64Converter.css";

function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput("Invalid input for Base64 encoding.");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput("Invalid Base64 string.");
    }
  };

  return (
    <div className="converter-container">
      <div className="converter-box">
        <h2 className="converter-title">Base64 Converter</h2>
        <textarea
          className="converter-textarea"
          rows="5"
          placeholder="Enter text here..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleEncode} className="converter-button encode">
            Encode
          </button>
          <button onClick={handleDecode} className="converter-button decode">
            Decode
          </button>
        </div>
        <textarea
          className="converter-textarea result"
          rows="5"
          placeholder="Result will appear here..."
          value={output}
          readOnly
        />
      </div>
    </div>
  );
}

export default Base64Converter;
