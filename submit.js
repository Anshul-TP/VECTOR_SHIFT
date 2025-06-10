// submit.js
import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import "../src/styles/submit.css";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = useCallback(async () => {
    const nodes = getNodes();
    const edges = getEdges();

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      alert(
        `Pipeline Analysis:\n\n` +
          `Number of Nodes: ${data.num_nodes}\n` +
          `Number of Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      alert("Error analyzing pipeline: " + error.message);
    }
  }, [getNodes, getEdges]);

  return (
    <div className="submit-container">
      <button onClick={handleSubmit} className="submit-button">
        Analyze Pipeline
      </button>
    </div>
  );
};
