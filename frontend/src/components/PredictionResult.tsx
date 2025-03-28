import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    prediction: string;
    confidence: number;
  };
}

function PredictionResult({ prediction }: PredictionResultProps) {
  const isHighRisk = prediction.confidence > 0.7;

  return (
    <div className="glass-effect rounded-xl shadow-xl p-8 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center justify-center mb-6">
        {isHighRisk ? (
          <AlertTriangle className="h-16 w-16 text-red-500 animate-float" />
        ) : (
          <CheckCircle className="h-16 w-16 text-green-500 animate-float" />
        )}
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Analysis Results
      </h2>

      <div className="space-y-6">
        <div className="bg-white/50 p-6 rounded-lg shadow-inner">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Prediction
          </h3>
          <p className="text-xl font-semibold text-gray-900 mt-2">
            {prediction.prediction}
          </p>
        </div>

        <div className="bg-white/50 p-6 rounded-lg shadow-inner">
          <h3 className="text-sm font-medium text-gray-500">Confidence Score</h3>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  isHighRisk ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${prediction.confidence * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              {(prediction.confidence * 100).toFixed(1)}% Confidence
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-inner ${
          isHighRisk ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            isHighRisk ? 'text-red-800' : 'text-green-800'
          }`}>
            {isHighRisk ? 'Urgent Attention Required' : 'Low Risk Assessment'}
          </h3>
          <p className={`text-sm ${
            isHighRisk ? 'text-red-700' : 'text-green-700'
          }`}>
            {isHighRisk
              ? 'Based on the analysis, immediate medical consultation is recommended. Please contact your healthcare provider as soon as possible.'
              : 'The analysis suggests lower risk levels. However, maintaining regular check-ups and a healthy lifestyle is still important for your liver health.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;