// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <DraggableNode type="customInput" label="Input" />
      <DraggableNode type="llm" label="LLM" />
      <DraggableNode type="customOutput" label="Output" />
      <DraggableNode type="text" label="Text" />
      <DraggableNode type="textSummarizer" label="Text Summarizer" />
      <DraggableNode type="dataEnrichment" label="Data Enrichment" />
      <DraggableNode type="apiGateway" label="API Gateway" />
      <DraggableNode type="cache" label="Cache" />
      <DraggableNode type="validator" label="Validator" />
    </div>
  );
};
