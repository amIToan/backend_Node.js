import Login from "../components/login";
import Register from "../components/register";
import React from 'react';
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { useContext, useEffect } from "react";
const Auth = () => {
    let body;
    let Navigate = useNavigate();
    const { state: { loading, isAuthenticated } } = useContext(AuthContext);
    let params = useParams();
    if (loading) {
        body = (<>
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        </>)   
    }else {
        body = (
            <>
                {(params.invoiceId === 'login' || params.invoiceId === undefined ) && <Login />}
                {params.invoiceId === 'register' && <Register />}
            </>
        )
    }
    useEffect(() => {
        if (isAuthenticated && params.invoiceId !== 'register') return Navigate('/dashboard')
        return () => {
            console.log('component already unmounted')
        };
    }, [isAuthenticated]);
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1> Learn it</h1>
                    <h4> Keep track of what u are learning</h4>
                    {body}
                </div>
            </div>
        </div>

    )
}

export default Auth;
