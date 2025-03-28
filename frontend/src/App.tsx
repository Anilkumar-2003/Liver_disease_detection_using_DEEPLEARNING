import { useState } from 'react';
import { Activity, AlertCircle, FileImage, Loader2, Heart, Stethoscope } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import PredictionResult from './components/PredictionResult';

function App() {
  const [prediction, setPrediction] = useState<any>(null);

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <div className="medical-bg">
      <nav className="glass-effect shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600 animate-float" />
              <span className="text-xl font-semibold text-gray-800">LiverScan AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Heart className="h-5 w-5 text-red-500 animate-float" />
              <Stethoscope className="h-5 w-5 text-blue-500 animate-float" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-float">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Liver Disease Detection
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Advanced AI-powered analysis for early detection and prevention
          </p>
        </div>

        {!prediction ? (
          <div className="glass-effect rounded-xl shadow-xl p-8 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-start space-x-4 mb-6">
              {/* <div className="flex-shrink-0">
                <FileImage className="h-6 w-6 text-blue-500 animate-float" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Image Upload Guidelines
                </h2>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Upload clear, high-resolution liver scan images</li>
                  <li>Supported formats: JPEG, PNG</li>
                  <li>Maximum file size: 5MB</li>
                  <li>Ensure proper lighting and focus in the scan</li>
                </ul>
              </div> */}
            </div>

            <ImageUpload setPrediction={setPrediction} />
          </div>
        ) : (
          <>
            <PredictionResult prediction={prediction} />
            <button
              onClick={handleReset}
              className="mx-auto block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300"
            >
              Analyze Another Image
            </button>
          </>
        )}

        <div className="mt-8 glass-effect rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 animate-float" />
            <div className="space-y-2">
              <p className="text-sm text-gray-800 font-medium">
                Medical Disclaimer
              </p>
              <p className="text-sm text-gray-600">
                This AI-powered tool is designed to assist medical professionals in their diagnosis process. 
                The results should not be considered as a final diagnosis. Always consult with qualified 
                healthcare providers for proper medical evaluation and treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;