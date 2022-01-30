import React, { useEffect, useState } from 'react';
import usePlatform from '../hooks/usePlatform';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { PlatformList } from '../constants';

function FacebookButton() {

    const { signIn, getCurrentUserByPlatform } = usePlatform();
    const [facebook, setFacebook] = useState(null);

    const responseFacebook = async (response) => {
        await signIn(PlatformList.FACEBOOK, response);
        setFacebook(response);
    }

    useEffect(() => {
        const getFacebookUserData = async () => {
            setFacebook(await getCurrentUserByPlatform(PlatformList.FACEBOOK));
        }
        getFacebookUserData();
    }, [getCurrentUserByPlatform]);

    return <FacebookLogin
        appId={process.env.REACT_APP_API_URL}
        fields="name,email,picture"
        callback={responseFacebook} 
        render={renderProps => (
            <button 
                className="w-60 bg-[#3A569F] p-5 rounded-md text-white drop-shadow-xl hover:bg-opacity-90" 
                onClick={renderProps.onClick}
            >
                {!!facebook ? 
                    <div className="flex flex-row items-center relative h-10">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                        <img src={facebook.picture.data.url} className="absolute left-9 w-12 h-12 rounded-full border-white border-2" /> 
                        <p className="absolute left-20 text-slate-100 text-base ml-5">Linked</p>
                    </div>
                    : 
                    <div className="flex flex-row items-center relative h-10">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="absolute left-0 w-12 rounded-full bg-white border-white border-2 z-0"/> 
                        <p className="absolute left-12 text-slate-100 text-base ml-5 w-30">Link right now!</p>
                    </div>
                }
            </button>
        )}
    />;
}

export default FacebookButton;
