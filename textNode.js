// textNode.js

import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to extract variables from text
  const extractVariables = (text) => {
    const regex = /{{([^}]+)}}/g;
    const matches = [...text.matchAll(regex)];
    return matches.map((match) => match[1].trim());
  };

  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <div className="node node-text">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      {/* Dynamic handles for variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            background: "#555",
          }}
        />
      ))}
      <div className="node-title">Text</div>
      <div className="node-content">
        <label className="node-label">
          Text:
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Type text with {{variables}} to create handles"
            rows={1}
          />
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
