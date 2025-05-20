import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { AnalysisResultProps } from '../types';

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ response, loading }) => {
  if (loading) {
    return (
      <div className="loading-indicator">
        Analisando imagem...
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="analysis-box">
      <h3>Resultado da Análise:</h3>
      <ReactMarkdown>{response}</ReactMarkdown>
    </div>
  );
}; 