import React, { useState } from "react";
import "./JsonFormatter.css";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e) {
      setOutput("❌ Invalid JSON: " + e.message);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard
      .writeText(output)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy.");
      });
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-box">
        <h2 className="formatter-title">JSON Formatter</h2>

        <textarea
          className="formatter-textarea"
          placeholder="Paste your JSON here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={8}
        />

        <div className="button-group">
          <button onClick={handleFormat} className="formatter-button format">
            Format JSON
          </button>
          <button onClick={handleCopy} className="formatter-button secondary">
            Copy to Clipboard
          </button>
          <button
            onClick={handleDownload}
            className="formatter-button secondary"
          >
            Download JSON
          </button>
        </div>

        <textarea
          className="formatter-textarea result"
          placeholder="Formatted JSON will appear here..."
          value={output}
          readOnly
          rows={8}
        />
      </div>
    </div>
  );
}

export default JsonFormatter;
