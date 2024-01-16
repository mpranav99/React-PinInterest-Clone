import React from 'react';
import {GoogleLogin} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import sharevideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle= (response)=>{

        const decodedData = jwt_decode(response.credential);
        // console.log(decodedData);
        localStorage.setItem('user' , JSON.stringify(decodedData));
        const {name , picture, sub } = decodedData;
        const user = {
            _id : sub, 
            _type : 'user', 
            userName : name, 
            image : picture 
        }
        client.createIfNotExists(user) 
            .then(()=>{
                navigate('/' , {replace : true})
            })
    }

    return (
        <div className='flex flex-col justify-start items-center h-screen'>
            <div className='relative w-full h-full'>
                <video 
                    src={sharevideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    autoPlay
                    muted
                    className='w-full h-full object-cover'
                >
                </video>
                <div className='absolute flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width="130px" alt="logo" />
                    </div>

                    <div className='shadow-2xl'>
                        
                        <GoogleLogin 
                            // clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;