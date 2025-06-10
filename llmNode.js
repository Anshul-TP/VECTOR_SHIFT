// llmNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens || 1000);

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  const handleMaxTokensChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    const clampedValue = Math.min(Math.max(value, 1), 4000);
    setMaxTokens(clampedValue);
  };

  return (
    <div className="node node-llm">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <div className="node-title">LLM</div>
      <div className="node-content">
        <label className="node-label">
          Model:
          <select
            className="node-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="claude-2">Claude 2</option>
            <option value="llama-2">Llama 2</option>
          </select>
        </label>
        <label className="node-label">
          Temperature:
          <input
            className="node-input"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <span>{temperature}</span>
        </label>
        <label className="node-label">
          Max Tokens:
          <input
            className="node-input"
            type="number"
            min="1"
            max="4000"
            value={maxTokens}
            onChange={handleMaxTokensChange}
          />
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </div>
  );
};
