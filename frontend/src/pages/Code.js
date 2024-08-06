// src/pages/Code.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import '../index.css'; // Asegúrate de que el CSS se importe aquí

function CodePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');  // Eliminar el token del almacenamiento local
      navigate('/login');  // Redirigir a la página de inicio de sesión
    };


  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);
  const [error, setError] = useState(null);

  const [selectedModel, setSelectedModel] = useState('YOLOv8');
  const [selectedVar, setSelectedVar] = useState('');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [radio, setRadio] = useState('');
  const [outputImage, setOutputImage] = useState(null);
  
//  async function getEC2PublicHostname() {
//    try {
//        const response = await fetch('http://169.254.169.254/latest/meta-data/public-hostname');
//        if (!response.ok) {
//            throw new Error('Failed to fetch EC2 public hostname');
//        }
//        const hostname = await response.text();
//        console.log('EC2 Public Hostname:', hostname);
//        return hostname;
//    } catch (error) {
//        console.error('Error fetching EC2 public hostname:', error);
//        return null;
//    }
//}

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null); // Clear error if a file is dropped
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear error if a file is selected
    }
  };

  const handleRun = async () => {
    if (!file) {
      setError('Please upload a file before running the process.');
      return;
    }
    const variables = {
      model: selectedModel,
    };
    console.log(JSON.stringify(variables, null, 2));

    setLoading(true);
    setOutputVisible(false);
    setError(null); // Clear error on valid run
    
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', selectedModel);
    
      try {
        //        const hostname = await getEC2PublicHostname();
        //        if (!hostname) {
        //        throw new Error('Failed to fetch EC2 public hostname');
        //        }
        //         const backendUrl = "http://" + hostname + ":8000/invoke_model/";
        // TODO: fix this so i don't have to hard code in the EC2 address every time
        const backendUrl = "http://localhost:8000/invoke_model"
        console.log("Making request to " + backendUrl)
        const response = await fetch(backendUrl, {
          method: 'POST',
          body: formData
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setOutputImage(url);    
    
        // Handle the result as needed
        setLoading(false);
        setOutputVisible(true);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
        setError('There was a problem processing your request.');
      }
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = outputImage;
    link.download = 'model_output.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#103063ff] text-white">
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
          <div className="p-4 rounded-md flex justify-between items-center" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px' }}>
          <h1 className="text-4xl font-bold">
            <Link to="/" >
              SHELTER<span className="text-green-500">AID</span>
            </Link>
          </h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
            <div className="p-4 rounded-md" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px'}}>
              <h2 className="text-2xl mb-2 font-bold">Step 1</h2>
              <p>Select a file to upload</p>
              <div
                className={`border-dashed border-4 border-white-400 p-4 mt-4 text-center ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <label htmlFor="fileUpload" className="text-green-500">
                  {file ? `File: ${file.name}` : "Upload a file or drag and drop"}
                </label>
                <p>PNG, JPG, GIF up to 10MB</p>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="p-4 rounded-md" style={{ backgroundColor: '#2B65AF' , margin: '5px 10px 5px 10px'}}>
              <h2 className="text-2xl mb-2 font-bold">Step 2</h2>
              <p>Select model</p>
              <div className="mt-4">
                <div className="mb-2">
                  <label className="block mb-1">Model</label>
                  <select className="w-full p-2 rounded bg-white text-black" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                    <option value="YOLOv8">YOLOv8</option>
                    <option value="FasterRCNN">FasterRCNN</option>
                  </select>
                </div>
                <button className="mt-2 w-full bg-green-500 p-2 rounded" onClick={handleRun}>Run</button>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-md" style={{ backgroundColor: '#2B65AF', margin: '5px 10px 5px 10px'}}>
            <h2 className="text-2xl mb-2 font-bold">Output</h2>
            <div className="h-full bg-cover bg-center flex justify-center items-center">
              {loading ? (
                <ClipLoader color={"#ffffff"} loading={loading} size={75} />
              ) : outputVisible ? (
                <div className="flex flex-col items-center">
                {outputImage ? (
                  <img src={outputImage} alt="Output" style={{ transform: 'scale(0.9)'}} />
                ) : (
                <img src={process.env.PUBLIC_URL + '/output_02.png'} alt="Output" style={{ transform: 'scale(0.9)' }} />
                )}
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleDownload}>Download Image</button>
                </div>
              ) : (
                <p>No output to display</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CodePage;