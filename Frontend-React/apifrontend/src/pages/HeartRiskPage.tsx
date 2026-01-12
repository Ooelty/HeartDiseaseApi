import React from 'react';
import { useNavigate } from 'react-router-dom';
import hearticon from '../assets/favicon.ico';

const HeartRiskPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Arrière-plan flou fixe qui couvre toute la page */}
      <div className="fixed inset-0 -z-50">
        <img 
          src="background.jpg" 
          alt=""
          className="w-full h-full object-cover blur-sm opacity-75"

        />
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-100/60"></div>
      </div>
        

<div className="  fixed inset-0 flex items-center justify-center">

      {/* Carte principale */}
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl text-center border border-gray-100">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-cyan-500 mb-3">
          Évaluez votre santé cardiaque
        </h1>

        <p className="text-xl text-gray-600 mb-8 animate-pulse">
          Résultats en moins de 5 minutes !
        </p>

        <div className="relative my-8">
          <div className="inset-0 flex items-center">
            
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-13 h-13 rounded-full flex items-center justify-center">
             <img src={hearticon}
             alt="Icone de santé cardiaque"
             className='w-10 h-10'
             
            />
             
            </div>
  <div className="text-center">
  <p className="text-2xl  font-extrabold text-gray-700">SmartCardio </p>
  <p className="text-xs  text-gray-400">Technologie</p>
 
</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 mb-8">
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Notre technologie d'évaluation avancée analyse vos facteurs de risque 
            pour vous fournir une estimation personnalisée de votre santé cardiovasculaire.
          </p>
          </div>

         
          <button
            onClick={() => navigate('/register')}
            className="w-full max-w-md mx-auto py-4 px-6 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-blue-600 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            Commencer l'évaluation
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <p>
            Déjà un compte ?{' '}
            <span 
              onClick={() => navigate('/login')}
              className="text-cyan-500 hover:text-blue-500 cursor-pointer font-semibold transition-colors duration-200"
            >
              Connectez-vous pour accéder à votre dashboard
            </span>
          </p>
        </div>
      </div>

       
    </div>
    </div>
    
  );
};

export default HeartRiskPage;
