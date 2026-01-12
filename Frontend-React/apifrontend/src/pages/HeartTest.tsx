import React, { useState } from 'react';
import axios from 'axios';

// Interface for form data, matching the backend DTO
interface HeartTestData {
  age: string;
  sex: 'M' | 'F';
  height: string;
  weight: string;
  bloodPressureHigh: string;
  bloodPressureLow: string;
  cholesterol: string;
  glucose: string;
  isSmoker: boolean;
  isAlcoholic: boolean;
  isActive: boolean;
}

// Interface for the prediction result from the API
interface PredictionResult {
  hasHeartDisease: boolean;
  confidence: number;
}

const HeartTest: React.FC = () => {
  const [formData, setFormData] = useState<HeartTestData>({
    age: '40',
    sex: 'F',
    height: '165',
    weight: '70',
    bloodPressureHigh: '120',
    bloodPressureLow: '80',
    cholesterol: '200',
    glucose: '100',
    isSmoker: false,
    isAlcoholic: false,
    isActive: true,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const apiPayload = {
        age: Number(formData.age),
        sex: formData.sex,
        height: Number(formData.height),
        weight: Number(formData.weight),
        bloodPressureHigh: Number(formData.bloodPressureHigh),
        bloodPressureLow: Number(formData.bloodPressureLow),
        cholesterol: Number(formData.cholesterol),
        glucose: Number(formData.glucose),
        isSmoker: formData.isSmoker,
        isAlcoholic: formData.isAlcoholic,
        isActive: formData.isActive,
    };
    
    try {
      const response = await axios.post<PredictionResult>(
        'https://localhost:7225/api/patient/predict', 
        apiPayload
      );
      setResult(response.data);
    } catch (err: any) {
      console.error("API Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data;
        const errorMessages = errorData.errors ? Object.values(errorData.errors).flat().join(' ') : errorData.message;
        setError(`Erreur de validation: ${errorMessages || 'Données invalides.'}`);
      } else {
        setError("Une erreur de réseau est survenue. Le serveur est-il en cours d'exécution ?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  // FIX: Added a new component for the visual number display
  const ResultGauge = ({ confidence, hasHeartDisease }: PredictionResult) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (confidence / 100) * circumference;
    const strokeColor = hasHeartDisease ? 'stroke-red-500' : 'stroke-green-500';
    const textColor = hasHeartDisease ? 'text-red-500' : 'text-green-500';

    return (
      <div className="relative flex items-center justify-center w-40 h-40 mx-auto my-4">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={`transform -rotate-90 origin-center ${strokeColor} transition-all duration-1000`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
        </svg>
        <span className={`absolute text-4xl font-bold ${textColor}`}>
          {confidence.toFixed(0)}%
        </span>
      </div>
    );
  };

  // FIX: Updated input classes for bolder borders and better focus states
  const inputClasses = "w-full p-2 border-2 border-gray-300 rounded-md transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none";

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-50">
        <img src="/background.jpg" alt="Background" className="w-full h-full object-cover blur-sm opacity-75"/>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-100/60"></div>
      </div>

      <div className=" fixed inset-0 flex items-center justify-center">
      <div className=" w-full max-w-2xl p-10 rounded-2xl  text-center ">
        <div className="w-full max-w-4xl p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-cyan-500 mb-3">Évaluation du Risque Cardiovasculaire</h1>
          
          {!result ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="text-black" >
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-700">Âge (ans)</label>
                <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-700">Taille (cm)</label>
                <input id="height" type="number" name="height" value={formData.height} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-700">Poids (kg)</label>
                <input id="weight" type="number" name="weight" value={formData.weight} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-700">Sexe</label>
                <select id="sex" name="sex" value={formData.sex} onChange={handleChange} className={inputClasses}>
                    <option value="F">Femme</option>
                    <option value="M">Homme</option>
                </select>
              </div>
              <div className="text-black">
                <label htmlFor="bloodPressureHigh" className="block mb-2 text-sm font-medium text-gray-700">Tension Systolique</label>
                <input id="bloodPressureHigh" type="number" name="bloodPressureHigh" value={formData.bloodPressureHigh} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="bloodPressureLow" className="block mb-2 text-sm font-medium text-gray-700">Tension Diastolique</label>
                <input id="bloodPressureLow" type="number" name="bloodPressureLow" value={formData.bloodPressureLow} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="cholesterol" className="block mb-2 text-sm font-medium text-gray-700">Cholestérol (mg/dL)</label>
                <input id="cholesterol" type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="text-black">
                <label htmlFor="glucose" className="block mb-2 text-sm font-medium text-gray-700">Glucose (mg/dL)</label>
                <input id="glucose" type="number" name="glucose" value={formData.glucose} onChange={handleChange} className={inputClasses}/>
              </div>
              <div className="md:col-span-2 flex text-black flex-col space-y-2">
                <label className="flex items-center"><input type="checkbox" name="isSmoker" checked={formData.isSmoker} onChange={handleChange} className="mr-2 h-4 w-4"/> Fumeur</label>
                <label className="flex items-center"><input type="checkbox" name="isAlcoholic" checked={formData.isAlcoholic} onChange={handleChange} className="mr-2 h-4 w-4"/> Consommation d'alcool</label>
                <label className="flex items-center"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="mr-2 h-4 w-4"/> Activité physique régulière</label>
              </div>
             
              <button type="submit" disabled={isLoading} className=" max-w-lg w-lvh mw-auto py-3 px-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-blue-600 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 text-center transform hover:scale-[1.02] active:scale-95">
                {isLoading ? 'Calcul en cours...' : 'Évaluer mon risque'}
              </button>
             
            </form>
          ) : (
            <div className="text-center p-4 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Résultat de l'Évaluation</h2>
              {/* FIX: Using the new visual gauge for the number */}
              <ResultGauge confidence={result.confidence} hasHeartDisease={result.hasHeartDisease} />
              <p className={`text-xl font-bold ${result.hasHeartDisease ? 'text-red-600' : 'text-green-600'}`}>
                {result.hasHeartDisease ? 'Risque de maladie cardiaque DÉTECTÉ' : 'Risque de maladie cardiaque FAIBLE'}
              </p>
              <button onClick={resetForm} className="mt-6 py-3 px-6 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                Faire une Nouvelle Évaluation
              </button>
            </div>
            
          )}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default HeartTest;