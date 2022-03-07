import { useContext } from 'react';
import {  Navigate, Route } from 'react-router-dom';
import { Context } from './context/Context';
const ProtectedRoute = ({Component}) => {
    
    const { user} = useContext(Context);
    return user ? <Component/> : <Navigate to="/" />;
    
}

export default ProtectedRoute;

