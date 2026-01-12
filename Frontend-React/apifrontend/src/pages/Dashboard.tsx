import React from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
  const navigate=useNavigate();
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

      {/* Contenu principal */}
      <div className="relative z-10 p-8">
        <h1 className="text-3xl font-light mb-8 text-center text-slate-900 font-serif">Santé cardiaque</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Carte Fréquence cardiaque */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Fréquence cardiaque</h2>
            <p className="text-slate-600 leading-relaxed">Chez un adulte au repos, le rythme cardiaque est compris entre 50 et 100 pulsations par minute ; il varie d’un individu à l’autre. Il peut augmenter ou diminuer selon l’état d’activité, la température extérieure ou la prise de médicaments, de café…..</p>
          </div>

          {/* Carte Tension artérielle */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Tension artérielle</h2>
            <p className="text-slate-600 leading-relaxed">Idéalement autour de 120/80 mmHg. Une tension élevée peut causer des maladies cardiaques.</p>
          </div>

          {/* Carte Cholestérol */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Cholestérol</h2>
            <p className="font-medium mb-2 text-slate-700">Différence entre le rapport cholestérol-HDL et LDL</p>
            <p className="mb-3 text-slate-600 leading-relaxed">
              Le cholestérol-HDL est considéré comme protecteur, tandis qu'un excès de cholestérol-LDL est un facteur de risque cardiovasculaire.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Un taux de HDL inférieur à 0,40 g/L est risqué, alors qu'un taux supérieur à 0,60 g/L est protecteur.
            </p>
          </div>

          {/* Carte Mode de vie */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Mode de vie</h2>
            <ul className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Gestion du poids</li>
              <li>Gestion du stress</li>
              <li>Alimentation saine</li>
              <li>Activité physique régulière</li>
            </ul>
          </div>

          {/* Carte Prévention */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Prévention</h2>
            <p className="text-slate-600 leading-relaxed">
              Adopter une hygiène de vie saine et effectuer des contrôles médicaux réguliers permettent de prévenir les maladies cardiovasculaires.
              En résumé:<br/>
              <br/>
               -  Bilans médicaux réguliers<br />
               -  Alimentation équilibrée<br />
               -  Activité physique quotidienne<br />
               -  Arrêt du tabac <br />
               -  Gestion du stress
            </p>
       
          </div>
           {/* Section supplémentaire */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 max-w-4xl mx-auto">
          <h2 className="text-2xl font-medium mb-4 text-slate-700 text-center">Conseils pour un cœur en santé</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Alimentation</h3>
              <ul className="text-slate-600 space-y-1">
                <li>• Privilégiez les fruits et légumes</li>
                <li>• Choisissez des graisses saines</li>
                <li>• Limitez le sel et le sucre</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Activité physique</h3>
              <ul className="text-slate-600 space-y-1">
                <li>• 30 minutes par jour minimum</li>
                <li>• Marche, natation, vélo</li>
                <li>• Renforcement musculaire</li>
              </ul>
            </div>
            {/* Carte Test Cardiaque - Même hauteur que Prévention */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300 flex flex-col">
            <h2 className="text-xl font-medium mb-3 text-slate-700">Test Cardiaque</h2>
            <p className="text-slate-600 leading-relaxed mb-0 flex-grow">
              Évaluez rapidement votre santé cardiaque avec notre test personnalisé.
            </p>
            <button 
              className="w-full max-w-md mx-auto py-4 px-6 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              onClick={() => navigate('/heart-test')}
            >
              Faire le test
            </button>
          </div>

        </div>
          </div>
        </div>
        </div>
          </div>  
    
  );
};

export default Dashboard;