import React, { useEffect, useState } from 'react';
import usePlatform from '../hooks/usePlatform';
import { PlatformList } from '../constants';
import {
    useNavigate,
    useLocation
} from "react-router-dom";

function TwitterButton() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { signIn, signInCallback, userDataPlataform, getCurrentUserByPlatform } = usePlatform();
    const [twitter, setTwitter] = useState(null);

    const responseTwitter = async () => {
        const response = await signIn(PlatformList.TWITTER, null);
        const urlAutorization = response?.twitter?.authorizationUrl;
        if (urlAutorization){
            window.location.href = urlAutorization;
        }
        setTwitter(response);
    }

    useEffect(() => {
        const getTwitterUserData = async () => {
            setTwitter(await getCurrentUserByPlatform(PlatformList.TWITTER));
        }
        getTwitterUserData();
    }, [getCurrentUserByPlatform]);

    useEffect(() => {
        const getTwitterUserData = async (oauthVerifier) => {
            await signInCallback(PlatformList.TWITTER, oauthVerifier);
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const oauthVerifier = urlParams.get('oauth_verifier');
        if (oauthVerifier) {
            getTwitterUserData(oauthVerifier);
        }        
    }, []);

    useEffect(() => {
        if (userDataPlataform && userDataPlataform.twitter?.userId){
            navigate(state?.path || "/");
        }
    }, [userDataPlataform?.twitter]);
    


    return (
        <button 
            className="w-60 bg-[#4FA1F2] p-5 rounded-md text-white ml-5 mr-5 drop-shadow-xl hover:bg-opacity-90" 
            onClick={responseTwitter}
        >
            {!!userDataPlataform?.twitter?.userId ? 
            <div className="flex flex-row items-center relative h-10">
                <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                <img src={userDataPlataform.twitter.photo} className="absolute left-9 w-12 h-12 rounded-full border-white border-2" /> 
                <p className="absolute left-20 text-slate-100 text-base ml-5">Linked</p>
            </div>
            : 
            <div className="flex flex-row items-center relative h-10">
                <img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                <p className="absolute left-12 text-slate-100 text-base ml-5 w-30">Link right now!</p>
            </div>
            }
        </button>
    )
}

export default TwitterButton;
