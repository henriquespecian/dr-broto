export interface ImageAnalysisResponse {
  result: string;
}

export interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

export interface AnalysisResultProps {
  response: string | null;
  loading: boolean;
} 