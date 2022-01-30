import React, { useEffect, useState } from 'react';
import FacebookButton from './facebookButton';
import Publisher from './publisher';
import Posts from './posts';
import TwitterButton from './twitterButton';

const Main = () => {

    const [openNewPostModal, setOpenPostModalModal] = useState(false);
    const handleNewPostCreated = async () => {
        setOpenPostModalModal(false);
    }

    return (
        <div>
            <div className="flex-1 p-10">
                <p>Social Platforms</p>
                <div className="flex flex-row">
                    <div className="text-2xl font-bold z-0">
                        <FacebookButton/>
                    </div>
                    <div className="text-2xl font-bold z-0">
                        <TwitterButton/>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <button className="bg-blue-600 hover:bg-blue-500 rounded-full w-1/3 h-16 text-white" onClick={() => setOpenPostModalModal(true)} >New Post</button>
                </div>
            </div>
            <div>
                <Posts/>
            </div>
            <Publisher 
                open={openNewPostModal} 
                callbackCancel={() => {setOpenPostModalModal(false)}} 
                callbackNewPost={() => {handleNewPostCreated()}}
            />
        </div>
    );
}

export default Main;
