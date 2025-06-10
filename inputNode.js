// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <div className="node node-input">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      <div className="node-title">Input</div>
      <div className="node-content">
        <label className="node-label">
          Name:
          <input
            className="node-input"
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label className="node-label">
          Type:
          <select
            className="node-select"
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
};
