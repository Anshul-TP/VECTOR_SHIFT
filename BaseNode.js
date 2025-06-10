import { Handle, Position } from "reactflow";
import { useState } from "react";

export const createNode = ({
  title,
  width = 200,
  height = 80,
  inputs = [],
  outputs = [],
  content = null,
  customStyles = {},
  customHandlers = {},
}) => {
  return ({ id, data, selected }) => {
    const [state, setState] = useState(data || {});

    const handleInputChange = (key, value) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

    const handleRemove = (event) => {
      event.stopPropagation();
      if (data.onRemove) {
        data.onRemove(id);
      }
    };

    return (
      <div className={`node ${selected ? "selected" : ""}`}>
        <button
          className="node-remove-button"
          onClick={handleRemove}
          title="Remove node"
        >
          ×
        </button>
        {/* Input Handles */}
        {inputs.map((input, index) => (
          <Handle
            key={`${id}-${input.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
          />
        ))}
        <div className="node-title">{title}</div>
        <div className="node-content">
          {content({
            state: data,
            handleInputChange: (key, value) => {
              if (data.onChange) {
                data.onChange(key, value);
              }
            },
          })}
        </div>
        {outputs.map((output, index) => (
          <Handle
            key={`${id}-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
          />
        ))}
      </div>
    );
  };
};
