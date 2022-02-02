import React, { useEffect, useState } from 'react';
import FacebookButton from './facebookButton';
import Publisher from './publisher';
import Posts from './posts';
import TwitterButton from './twitterButton';
import SummaryItem from './summaryItem';
import usePlatform from '../hooks/usePlatform';

const Main = () => {

    const { userDataPlataform } = usePlatform();
    const [openNewPostModal, setOpenPostModalModal] = useState(false);
    const [postDisabled, setPostDisabled] = useState(true);
    const handleNewPostCreated = async () => {
        setOpenPostModalModal(false);
    }

    useEffect(() => {
        setPostDisabled(!(userDataPlataform?.facebook || userDataPlataform?.twitter))
    }, [userDataPlataform]);
    

    return (
        <div className="w-full overflow-auto">
            <div className="flex-1 p-5">
                <div className="bg-gray-100 p-2 pb-3 rounded-md">
                    <p className="text-gray-500 pl-2">Social Platforms</p>
                    <div className="flex flex-wrap items-stretch">
                        <FacebookButton/>
                        <TwitterButton/>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex-1 p-2.5">
                    <div className="flex flex-wrap items-stretch">
                        <div className="w-full p-2.5 sm:w-3/6 lg:w-2/6">
                            <div className="">
                                <button
                                    disabled={postDisabled}
                                    className={`w-full h-20 rounded-md text-2xl text-white ${postDisabled ? 'bg-gray-400' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:bg-opacity-80'}`} 
                                    onClick={() => setOpenPostModalModal(true)} 
                                >
                                    New Post
                                </button>
                            </div>
                        </div>
                        <SummaryItem summaryItem='Likes'/>
                        <SummaryItem summaryItem='Responses'/>
                        <SummaryItem summaryItem='Shares'/>
                        <SummaryItem summaryItem='Views'/>
                        <SummaryItem summaryItem='Earned'/>
                    </div>
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
