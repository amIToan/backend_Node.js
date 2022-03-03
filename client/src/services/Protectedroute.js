import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import React from 'react';
import Dashboard from '../views/dashboard';
import About from '../views/about';
const Protectedroute = () => {
    const { state: { loading, isAuthenticated } } = useContext(AuthContext);
    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    return (
        <Routes>
            { isAuthenticated ?
            <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
            </> 
            :
            <Route path="/" element={<Navigate to="/commonForm/login" />} />
            }
        </Routes>
    )
}

export default Protectedroute;
