import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import hearticon from '../assets/favicon.ico';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState(false); // ✅ état de succès

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7225/api/auth/login",
        {
          email: form.email,
          password: form.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Connexion réussie:", response.data);

      setSuccess(true); // ✅ affiche carte de succès

      setTimeout(() => {
        navigate("/dashboard"); // ✅ redirige après 2 secondes
      }, 2000);

    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      alert(error.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Arrière-plan flou fixe */}
      <div className="fixed inset-0 -z-50">
        <img 
          src="background.jpg" 
          alt=""
          className="w-full h-full object-cover blur-sm opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-100/60"></div>
      </div>

      <div className="fixed inset-0 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 rounded-3xl shadow-md bg-white/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-13 h-13 rounded-full flex items-center justify-center">
                <img
                  src={hearticon}
                  alt="Icone de santé cardiaque"
                  className="w-10 h-10"
                />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Se connecter
            </h2>
          </div>

          {/* ✅ Message de succès */}
          {success && (
            <div className="mb-4 w-full max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center shadow-sm transition-all duration-300">
              ✅ Connexion réussie ! Redirection en cours...
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full max-w-md mx-auto py-4 px-6 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-blue-600 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                Se connecter
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <a 
                href="/register" 
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
