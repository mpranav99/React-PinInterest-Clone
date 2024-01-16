import React from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from '../src/container/Home'
import Login from '../src/components/Login'

const App = () => {
    return (
        <GoogleOAuthProvider 
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
        >
       <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/*' element={<Home />} />
       </Routes>
       </GoogleOAuthProvider>
    );
};

export default App;