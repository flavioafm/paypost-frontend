import React, { useEffect, useState } from 'react';
import { PlatformList } from '../constants';
import usePlatform from '../hooks/usePlatform';

function SelectPostTarget(props) {

    const { userDataPlataform } = usePlatform();
    const [ allSelected, setAllSelected] = useState(true);
    const [ facebookSelected, setFacebookSelected] = useState(false);
    const [ twitterSelected, setTwitterSelected] = useState(false);
    const [ result, setResult] = useState([])

    const mapSetters = {
        [PlatformList.FACEBOOK.key]: {value: facebookSelected, set: setFacebookSelected},
        [PlatformList.TWITTER.key]: {value: twitterSelected, set: setTwitterSelected},
    }

    const selectedStyle = 'border-red-600';
    const unSelectedStyle = 'border-white';

    const handerCallback = () => {
        const resultTemp = [];
        if (allSelected) {
            for (const key in mapSetters) {
                resultTemp.push(key)
            }
        } else {
            for (const key in mapSetters) {
                if (mapSetters[key].value) {
                    resultTemp.push(key)
                }
            }
        }
        setResult(resultTemp);
    }

    const handleSelection = (selected) => {
        if ( selected === 'all') {
            const previousAllValue = allSelected;
            setAllSelected(!allSelected);
            if (!previousAllValue) {
                setFacebookSelected(false);
                setTwitterSelected(false);
            }
        } else {
            setAllSelected(false);
            mapSetters[selected].set(!mapSetters[selected].value);
        }
        handerCallback();
    }

    useEffect(() => {
        handerCallback();
    }, [allSelected, facebookSelected, twitterSelected]);

    useEffect(() => {
        props.callback(result);
    }, [result]);
    
    useEffect(() => {
        handerCallback();
        props.callback(result);
    }, []);

    return (
            <div className="flex flex-col">
                <p className="pl-1">Select the Post Target:</p>
                <div className="flex flex-row justify-items-start items-center">
                    <div 
                        onClick={() => handleSelection('all')} 
                        className={`w-12 h-12 m-1 bg-blue-500 text-white rounded-full text-center p-2 text-xl 
                                    border-2 ${allSelected ? selectedStyle: unSelectedStyle }`}
                    >
                        All
                    </div>
                    { 
                        userDataPlataform.facebook &&
                        <div onClick={() => handleSelection(PlatformList.FACEBOOK.key)}>
                            <img 
                                src={PlatformList.FACEBOOK.logo} 
                                className={`w-12 m-1 rounded-full bg-white border-2 z-0 ${facebookSelected ? selectedStyle: unSelectedStyle }`}
                            />
                        </div>
                    }
                    {
                        userDataPlataform.twitter &&
                        <div onClick={() => handleSelection(PlatformList.TWITTER.key)}>
                            <img 
                                src={PlatformList.TWITTER.logo} 
                                className={`w-12 m-1 rounded-full bg-white border-2 z-0 ${twitterSelected ? selectedStyle: unSelectedStyle }`}
                            />
                        </div>
                    }

                </div>
            </div>
    );
}

export default SelectPostTarget;
