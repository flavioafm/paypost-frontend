import React, { useEffect, useState } from 'react';
import usePlatform from '../hooks/usePlatform';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { PlatformList } from '../constants';

function FacebookButton() {

    const { signIn, userDataPlataform, refreshUserData } = usePlatform();

    const responseFacebook = async (response) => {
        await signIn(PlatformList.FACEBOOK.key, response);
    }

    useEffect(() => {
        refreshUserData();
    }, []);

    return <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}  
        fields="name,email,picture"
        callback={responseFacebook} 
        render={renderProps => (
            <button 
                className="w-full p-5 h-20 m-2 sm:w-1/3 bg-[#3A569F] rounded-md text-white shadow-xl shadow-blue-500/50 hover:bg-opacity-90" 
                onClick={renderProps.onClick}
            >
                {!!userDataPlataform?.facebook ? 
                    <div className="flex flex-row items-center relative h-10">
                        <img src={PlatformList.FACEBOOK.logo} className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                        <img src={userDataPlataform?.facebook?.picture?.data?.url} className="absolute left-9 w-12 h-12 rounded-full border-white border-2" /> 
                        <p className="absolute left-20 text-slate-100 text-base ml-5">Linked</p>
                        <p className="absolute left-20 top-7 text-slate-100 text-xs ml-5">{userDataPlataform?.facebook?.email}</p>
                    </div>
                    : 
                    <div className="flex flex-row items-center relative h-10">
                        <img src={PlatformList.FACEBOOK.logo} className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                        <p className="absolute left-12 text-slate-100 text-base ml-5 w-30">Link right now!</p>
                    </div>
                }
            </button>
        )}
    />;
}

export default FacebookButton;

