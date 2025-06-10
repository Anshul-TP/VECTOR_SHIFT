import { createNode } from "./BaseNode";
import { useState } from "react";
import { Handle, Position } from "reactflow";

// Text Summarizer Node
export const TextSummarizerNode = createNode({
  title: "Text Summarizer",
  inputs: [{ id: "text" }],
  outputs: [{ id: "summary" }],
  content: ({ state, handleInputChange }) => (
    <div>
      <label className="node-label">Summary Type</label>
      <select
        className="node-select"
        value={state.summaryType || "extractive"}
        onChange={(e) => handleInputChange("summaryType", e.target.value)}
      >
        <option value="extractive">Extractive</option>
        <option value="abstractive">Abstractive</option>
        <option value="key-points">Key Points</option>
      </select>
      <label className="node-label">Max Length</label>
      <input
        className="node-input"
        type="number"
        value={state.maxLength || 150}
        onChange={(e) => handleInputChange("maxLength", e.target.value)}
        min="50"
        max="1000"
      />
    </div>
  ),
});

// Data Enrichment Node
export const DataEnrichmentNode = createNode({
  title: "Data Enrichment",
  inputs: [{ id: "data" }],
  outputs: [{ id: "enriched" }],
  content: ({ state, handleInputChange }) => (
    <div>
      <label className="node-label">Enrichment Type</label>
      <select
        className="node-select"
        value={state.enrichmentType || "sentiment"}
        onChange={(e) => handleInputChange("enrichmentType", e.target.value)}
      >
        <option value="sentiment">Sentiment Analysis</option>
        <option value="entities">Entity Extraction</option>
        <option value="topics">Topic Detection</option>
        <option value="language">Language Detection</option>
      </select>
      <label className="node-label">Confidence Threshold</label>
      <input
        className="node-input"
        type="number"
        value={state.confidence || 0.7}
        onChange={(e) => handleInputChange("confidence", e.target.value)}
        min="0"
        max="1"
        step="0.1"
      />
    </div>
  ),
});

//API Gateway Node
export const APIGatewayNode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data.endpoint || "");
  const [method, setMethod] = useState(data.method || "GET");
  const [authType, setAuthType] = useState(data.authType || "none");

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <div className="node node-api">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      <Handle type="target" position={Position.Left} id="input" />
      <div className="node-title">API Gateway</div>
      <div className="node-content">
        <label className="node-label">
          Endpoint:
          <input
            className="node-input"
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com/endpoint"
          />
        </label>
        <label className="node-label">
          Method:
          <select
            className="node-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label className="node-label">
          Auth:
          <select
            className="node-select"
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
          >
            <option value="none">None</option>
            <option value="basic">Basic Auth</option>
            <option value="bearer">Bearer Token</option>
            <option value="apiKey">API Key</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

// Cache Node
export const CacheNode = ({ id, data }) => {
  const [ttl, setTtl] = useState(data.ttl || 3600);

  const handleRemove = (event) => {
    event.stopPropagation();
    if (data.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <div className="node node-cache">
      <button
        className="node-remove-button"
        onClick={handleRemove}
        title="Remove node"
      >
        ×
      </button>
      <Handle type="target" position={Position.Left} id="input" />
      <div className="node-title">Cache</div>
      <div className="node-content">
        <label className="node-label">
          TTL (seconds):
          <input
            className="node-input"
            type="number"
            value={ttl}
            onChange={(e) => setTtl(parseInt(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

// Validation Node
export const ValidationNode = createNode({
  title: "Validator",
  inputs: [{ id: "data" }],
  outputs: [{ id: "valid" }, { id: "invalid" }],
  content: ({ state, handleInputChange }) => (
    <div>
      <label className="node-label">Schema Type</label>
      <select
        className="node-select"
        value={state.schema || "json"}
        onChange={(e) => handleInputChange("schema", e.target.value)}
      >
        <option value="json">JSON Schema</option>
        <option value="xml">XML Schema</option>
        <option value="custom">Custom</option>
      </select>
    </div>
  ),
});
