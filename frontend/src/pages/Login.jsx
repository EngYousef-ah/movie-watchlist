import { useState } from 'react';
import axios from 'axios'

import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import Loading from "../components/Loading";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post("http://localhost:5000/api/user", {
      email: email,
      password: password
    })
      .then(() => {
        toast.success('Login successful');
        navigate("/catalogue")

      })
      .catch(() => {
        toast.error("Incorrect email or password.")
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#1E2024" }}
    >
      {isLoading ? <Loading /> : null}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-300">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: "#c23222" }}>
            Cinemaflix Login
          </h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-200"
              style={{ '--tw-ring-color': "#f0503d" }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-sm hover:underline" style={{ color: "#f0503d" }}>
                Forgot Password?
              </a>
            </div>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition duration-200"
              style={{ '--tw-ring-color': "#f0503d" }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#c23222" }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#d93f2d"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#c23222"}
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 border-t pt-6">
          This area is restricted to administrators only.
        </div>
      </div>
    </div>
  );
};

export default Login;