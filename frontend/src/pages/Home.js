import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#103063ff] text-white">
      <main className="container mx-auto p-4">
        <div className="p-4 rounded-md flex justify-between items-center" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px' }}>
          <h1 className="text-4xl font-bold">
          <Link to="/" >
            SHELTER<span className="text-green-500">AID</span>
            </Link>
          </h1>
          <button 
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="p-4 rounded-md" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px' }}>
              <h2 className="text-2xl mb-2 font-bold">History</h2>
              <p className="mb-10">
                Public health agencies exist to improve the health of everyone in their communities, especially vulnerable groups like people experiencing unsheltered homelessness. That said, it’s difficult to help people if you can’t find them. Currently, public health agencies rely on annual federal counts and ad hoc community reporting to quantify homelessness and identify encampments, and data is often incomplete, inaccurate, and out of date.
              </p>
              <h2 className="text-2xl mb-2 font-bold">About us</h2>
              <p className="mb-10">
                ShelterAID solves this encampment identifying problem by using machine learning and satellite imagery of cities to detect and map tents and encampments as they become active. Our tool helps public agencies find, count, and better support people living in unsheltered homelessness by providing resources exactly when and where they are most needed.
              </p>
              <h2 className="text-2xl mb-2 font-bold">Mission</h2>
              <p className="mb-10">
                Public Health Resources Map uses computer vision technology to help improve safety and public health outcomes for people living in unsheltered homelessness.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px' }}>
            <h2 className="text-2xl mb-2 font-bold">PUBLIC HEALTH RESOURCES MAP</h2>
            <img src="/home_shelteraid.png" alt="Shelter Image" className="w-full h-auto mt-2" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;