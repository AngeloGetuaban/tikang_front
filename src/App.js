import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Lessor from './pages/lessor/Lessor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessor" element={<Lessor />} />
      </Routes>
    </Router>
  );
}

export default App;
