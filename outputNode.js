// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <div className="node node-output">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div className="node-title">Output</div>
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
            value={outputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};
