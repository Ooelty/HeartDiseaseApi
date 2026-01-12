#
## Librairies

import pandas as pd
import numpy as np
import seaborn as sns 
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.metrics import confusion_matrix, classification_report, ConfusionMatrixDisplay
from xgboost import XGBClassifier, plot_importance

#  importation onnex
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import onnx
import onnxruntime as rt

#  Lire le fichier
data = pd.read_csv("cardio_train.csv", sep=";")
data['age'] = (data['age'] / 365).astype(int)
data['gender'] = data['gender'].map({1: 0, 2: 1})  # 0 = F, 1 = H

print(data.head(5))
print(data.info())
print("_____________________")
print(data['cardio'].value_counts(normalize=True))

# data réparation
X = data.drop(columns=['cardio'])
y = data['cardio']

#  Matrice de corrélation
corr = data.corr()
plt.figure(figsize=(20, 20))
sns.heatmap(data[corr.index].corr(), annot=True, cmap='vlag')

#  data split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2025, shuffle=True)

print('X_train shape:', X_train.shape)
print('X_test shape:', X_test.shape)

# Modèle de base
model = XGBClassifier(objective='binary:logistic', eval_metric='logloss', use_label_encoder=False)
model.fit(X_train, y_train)

#  Hyperparamètres pour RandomizedSearch
xgb = XGBClassifier(objective='binary:logistic', eval_metric='logloss', random_state=2025)
params = {
    "learning_rate": [0.01, 0.05, 0.1],
    "max_depth": [3, 4, 5, 6, 7],
    "n_estimators": [100, 200, 300],
    "gamma": [0, 0.1, 0.2],
    "subsample": [0.8, 1],
    "colsample_bytree": [0.8, 1]
}
##the best choise considering the params and nbr of itirations
random = RandomizedSearchCV(
    xgb,
    param_distributions=params,
    n_iter=5,
    cv=5,
    n_jobs=1,
    verbose=1
)

random.fit(X_train, y_train)
best_model = random.best_estimator_

#  Score
print("Score entraînement:", best_model.score(X_train, y_train) * 100)
print("Score test:", best_model.score(X_test, y_test) * 100)

#  Importance des variables
plot_importance(best_model)
plt.title("Importance des variables - XGBoost")
plt.show()

#  Prédictions
y_pred_xgb = best_model.predict(X_test)
print("Prédictions :", y_pred_xgb[:10])
print("Réelles :", y_test[:10].values)

#  Probabilités
y_pred_prob_xgb = best_model.predict_proba(X_test)
print("Probabilités :", y_pred_prob_xgb[:10] * 100)

#  Matrice de confusion
disp = ConfusionMatrixDisplay(confusion_matrix=confusion_matrix(y_test, y_pred_xgb), display_labels=[0, 1])
disp.plot()
plt.show()

#  Rapport classification
print("Classification Report :\n", classification_report(y_test, y_pred_xgb))

#  EXPORT ONNX 
print(" Conversion du modèle en ONNX...")

# Définir le type d'entrée attendu
initial_type = [('input', FloatTensorType([None, X_test.shape[1]]))]

# Conversion du modèle en ONNX
onnx_model = convert_sklearn(best_model, initial_types=initial_type)

# Sauvegarde dans un fichier
onnx_file_path = "xgboost_cardio_model.onnx"
with open(onnx_file_path, "wb") as f:
    f.write(onnx_model.SerializeToString())

print(f" Modèle XGBoost exporté au format ONNX → {onnx_file_path}")

# TEST INFERENCE AVEC ONNX
print(" Test de prédiction avec le modèle ONNX...")

# Charger modèle
session = rt.InferenceSession(onnx_file_path)
input_name = session.get_inputs()[0].name

# Prédire
X_test_onnx = X_test.astype(np.float32)
onnx_preds = session.run(None, {input_name: X_test_onnx})[0]

print(" Prédictions ONNX (10 premières) :", onnx_preds[:10])
