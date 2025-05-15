// DrBrotoApp.jsx
import React, { useState } from 'react';
import './DrBrotoApp.css';
import imgDrBroto from './../img/DrBroto.png'

function DrBrotoApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedImage(URL.createObjectURL(file));
  }
};

  const handleAnalyze = () => {
    alert('Analisando plantinha... 🌿🔍');
    // Aqui você pode conectar com backend ou IA depois
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

        <button className="analyze-button" onClick={handleAnalyze}>
          Analisar Planta 🚀
        </button>
      </main>
    </div>
  );
}

export default DrBrotoApp;