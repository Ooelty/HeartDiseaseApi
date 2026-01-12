# HeartDiseaseAPI

Projet complet combinant **Backend .NET**, **Frontend React** et **modèles de Machine Learning** pour prédire les maladies cardiaques.

## Structure du projet

- `Backend-dotnet/` : API .NET pour gérer les requêtes et fournir les prédictions ML.  
- `frontend/` : Application React pour l’interface utilisateur et la visualisation des résultats.  
- `ml-models/` : Modèles ML et fichiers de données.

## Modèles ML

1. **Entraînement initial :**
   - **Random Forest**
   - **Decision Tree (Arbre de décision)**
   > Ces modèles ont été utilisés pour expérimenter et comprendre les performances sur le dataset.

2. **Modèle final :**
   - **XGBoost**
   > Modèle final utilisé dans le projet pour fournir des prédictions plus précises.

## Installation et utilisation

1. **Cloner le dépôt :**


git clone https://github.com/username/HeartDiseaseAPI.git
cd HeartDiseaseAPI

Le backend:
cd Backend-dotnet
dotnet restore
dotnet run

Le frontend: 
cd frontend
npm install
npm start

git clone https://github.com/username/HeartDiseaseAPI.git
cd HeartDiseaseAPI
