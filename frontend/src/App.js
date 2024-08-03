import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Code from './pages/Code';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/code" element={<Code />} />
        {/* <Route 
          path="/code" 
          element={
            <PrivateRoute>
              <Code />
            </PrivateRoute>
          }  */}
        {/* /> */}
      </Routes>
    </Router>
  );
}

export default App;