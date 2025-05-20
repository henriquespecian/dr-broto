import React from 'react';
import type { ImageUploadProps } from '../types';

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="upload-section">
      <label htmlFor="upload" className="upload-label">
        Envie uma foto da sua plantinha 🌱
      </label>
      <input type="file" id="upload" accept="image/*" onChange={handleImageChange} />
      
      {selectedImage && (
        <div className="preview-container">
          <img src={selectedImage} alt="Prévia da planta" className="preview-img" />
        </div>
      )}
    </div>
  );
}; 