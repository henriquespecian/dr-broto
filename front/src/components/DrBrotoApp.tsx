// DrBrotoApp.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './DrBrotoApp.css';
import imgDrBroto from './../../public/drBroto.png';

function DrBrotoApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResponse, setAnalysisResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  }
};

  const handleAnalyzeImage = async () => {
  if (!selectedFile) {
    alert('Por favor, envie uma imagem primeiro.');
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append('photo', selectedFile);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setAnalysisResponse(data.result);
  } catch (error) {
    console.error('Erro ao analisar imagem', error);
   } finally {
    setLoading(false); // Stop loading
  }
};
    
  return (
    <div className="app-container">
      <header className="app-header">
        <img src={imgDrBroto} alt="Dr. Broto" className="mascote-img" />
        <h1>Dr. Broto</h1>
        <p className="subtitle">Seu consultor de plantinhas de apartamento!</p>
      </header>

      <main className="main-content">
        <label htmlFor="upload" className="upload-label">
          Envie uma foto da sua plantinha 🌱
        </label>
        <input type="file" id="upload" accept="image/*" onChange={handleImageChange} />
        
        {selectedImage && (
          <div className="preview-container">
            <img src={selectedImage} alt="Prévia da planta" className="preview-img" />
          </div>
        )}

        <button className="analyze-button" onClick={handleAnalyzeImage}>
          Analisar Planta 🚀
        </button>

        {analysisResponse && (
          <div className="analysis-box">
            <h3>Resultado da Análise:</h3>
            <ReactMarkdown>{analysisResponse}</ReactMarkdown>
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            Analisando imagem...
          </div>
        )}

      </main>
    </div>
  );
}

export default DrBrotoApp;