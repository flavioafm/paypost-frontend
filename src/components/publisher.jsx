import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import usePlatform from '../hooks/usePlatform';
import { PlatformList } from '../constants';
import SelectPostTarget from './selectPostTarget';
import Uploader from './upload';

function Publisher(props) {
    
    const { newPost } = usePlatform();
    const [open, setOpen] = useState(false);
    const [textPost, setTextPost] = useState('');
    const textAreaRef = useRef(null);
    const [publishDisabled, setPublishDisabled] = useState(true);
    const [postTarget, setPostTargets] = useState([]);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [publishing, setPublishing] = useState(false);

    const handleCancelAction = () => {
        props.callbackCancel();
    }

    const handleNewPostAction = async () => {
        setPublishDisabled(true);
        setPublishing(true);
        const keysPromises = postTarget.map(async partformTarget => {
            return await newPost(partformTarget, { text: textPost, photo: photoUrl});
        })
        await Promise.all(keysPromises).then(() => {
            props.callbackNewPost();
            setPublishDisabled(false);
            setPublishing(false);
        });
    }

    const handleTextPostChange = (event) => {
        setTextPost(event.target.value);
    }

    const handlePublishDisabled = () => {
        setPublishDisabled(textPost.length > 0 && postTarget.length ? false : true);
    }

    const handleSelectTargets = (selection) => {
        setPostTargets(selection);
    }

    const handlePhotoUrl = (url) => {
        setPhotoUrl(url);
    }

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    useEffect(() => {
        handlePublishDisabled();
    }, [textPost]);

    useEffect(() => {
        handlePublishDisabled();
    }, [postTarget]);
    
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={textAreaRef} onClose={() => handleCancelAction()}>
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block p-5 align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="">
                                <div className="w-full">
                                    <div className="text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        New Post 
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <textarea 
                                                ref={textAreaRef}
                                                name="textPost" 
                                                id="textPost" 
                                                rows="5" 
                                                className="text-sm text-gray-500 border-2 w-full p-2" 
                                                placeholder="Write something..." 
                                                onKeyUp={handleTextPostChange}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <Uploader callback={handlePhotoUrl}/>
                            </div>
                            <div className="mt-5">
                                <SelectPostTarget callback={handleSelectTargets}/>
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    disabled={publishDisabled}
                                    className="w-full inline-flex justify-center disabled:bg-opacity-30 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => handleNewPostAction()}
                                >   
                                    <svg className={`${publishing ? 'animate-spin' : 'hidden' }  -ml-1 mr-3 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    { publishing ? 'Publishing...' : 'Publish' }
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => handleCancelAction()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Publisher;
