import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/code');
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       localStorage.setItem('token', data.token);  // Guarda el token en el almacenamiento local
  //       navigate('/code');
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     setError("An error occurred. Please try again later.");
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#103063ff] text-white">
      <main className="container mx-auto p-4">
        <div className="p-4 rounded-md flex justify-between items-center" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px' }}>
          <h1 className="text-4xl font-bold">
            <Link to="/" >
              SHELTER<span className="text-green-500">AID</span>
            </Link>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="p-8 rounded-md bg-[#2B65AF]" style={{ width: '400px', margin: '20px 0', margin: '5px 10px 5px 10px' }}>
            <h2 className="text-2xl mb-4 text-center">Access</h2>
            <div className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <label className="block text-white mb-2">User</label>
                <input 
                  type="email" 
                  placeholder="Example: name@mail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="****************" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>
              <button 
                onClick={handleLogin}
                className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;