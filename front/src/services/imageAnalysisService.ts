import type { ImageAnalysisResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export class ImageAnalysisService {
  static async analyzeImage(file: File): Promise<ImageAnalysisResponse> {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    return response.json();
  }
} 