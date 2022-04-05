import { useContext } from 'react';
import {  Navigate, Route } from 'react-router-dom';
import { Context } from './context/Context';

//Redirecting on the basis of isUser logged in or logged out
const ProtectedRoute = ({Component}) => {
    
    const { user} = useContext(Context);
    return user ? <Component/> : <Navigate to="/" />;
    
}

export default ProtectedRoute;

