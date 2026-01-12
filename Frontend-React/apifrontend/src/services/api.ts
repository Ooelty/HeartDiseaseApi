// src/services/api.ts

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPatients() {
  const res = await fetch(`${BASE_URL}/api/patients`);
  return res.json();
}

// ➕ Créer un nouveau patient
export async function createPatient(patient: any) {
  const res = await fetch(`${BASE_URL}/api/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(patient)
  });

  if (!res.ok) throw new Error("Erreur lors de la création du patient");
  return res.json();
}

