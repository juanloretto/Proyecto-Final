import React from 'react';
import Admin from './views/AdminScreen';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin/*" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
