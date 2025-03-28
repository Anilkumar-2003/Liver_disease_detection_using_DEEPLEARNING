// ImageUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2 } from 'lucide-react';
import Loader from './Loader';

interface ImageUploadProps {
  setPrediction: (prediction: any) => void;
}

function ImageUpload({ setPrediction }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (selectedFile) {
      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setError('Please upload a JPEG or PNG image.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB.');
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <Loader />
      ) : preview ? (
        <div className="relative group">
          <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-lg shadow-md" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer text-white text-sm font-medium hover:underline">
              Click to change image
            </label>
            <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept="image/jpeg,image/png" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-8 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/50">
          <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept="image/jpeg,image/png" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-10 w-10 text-blue-500 mb-3 animate-float" />
            <span className="text-sm font-medium text-gray-700">Click to upload or drag and drop</span>
            <span className="text-xs text-gray-500 mt-1">JPEG or PNG up to 5MB</span>
          </label>
        </div>
      )}

      {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow-lg transform transition-all duration-300 ${
          loading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 hover:scale-[1.02]'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
            Processing...
          </>
        ) : (
          'Analyze Image'
        )}
      </button>
    </div>
  );
}

export default ImageUpload;