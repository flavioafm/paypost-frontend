import React, { useEffect } from 'react';
import usePlatform from '../hooks/usePlatform';
import { PlatformList } from '../constants';
import { useNavigate,  useLocation } from "react-router-dom";


function Callback() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { signInCallback, userDataPlataform } = usePlatform();

    useEffect(() => {
        const getTwitterUserData = async (oauthVerifier) => {
            await signInCallback(PlatformList.TWITTER.key, oauthVerifier);
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
        <div className="flex items-center justify-center h-screen">
            <div className="text-blue-600 font-bold">
                Redirecting....
            </div>
        </div>
    );
}

export default Callback;
