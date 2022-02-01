import React, { useEffect } from 'react';
import usePlatform from '../hooks/usePlatform';
import { PlatformList } from '../constants';
import {
    useNavigate,
    useLocation
} from "react-router-dom";

function TwitterButton() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { signIn, refreshUserData, userDataPlataform } = usePlatform();

    const responseTwitter = async () => {
        const response = await signIn(PlatformList.TWITTER.key, null);
        const urlAutorization = response?.twitter?.authorizationUrl;
        if (urlAutorization){
            window.location.href = urlAutorization;
        }
    }

    useEffect(() => {
        refreshUserData();
    }, []);

    return (
        <button 
            className="w-full h-20 p-5 m-2 sm:w-1/3 bg-[#4FA1F2] rounded-md text-white shadow-xl shadow-blue-500/50 hover:bg-opacity-90" 
            onClick={responseTwitter}
        >
            {!!userDataPlataform?.twitter?.userId ? 
            <div className="flex flex-row items-center relative h-10">
                <img src={PlatformList.TWITTER.logo} className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                <img src={userDataPlataform.twitter.photo} className="absolute left-9 w-12 h-12 rounded-full border-white border-2" /> 
                <p className="absolute left-20 text-slate-100 text-base ml-5">Linked</p>
                <p className="absolute left-20 top-7 text-slate-100 text-xs ml-5">{`@${userDataPlataform?.twitter?.screenName}`}</p>
            </div>
            : 
            <div className="flex flex-row items-center relative h-10">
                <img src={PlatformList.TWITTER.logo} className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                <p className="absolute left-12 text-slate-100 text-base ml-5 w-30">Link right now!</p>
            </div>
            }
        </button>
    )
}

export default TwitterButton;
