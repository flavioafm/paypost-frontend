import React from 'react';
import usePlatform from '../hooks/usePlatform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faReply, faShareAlt, faEye, faMoneyBillWave } from '@fortawesome/fontawesome-free-solid'

function SummaryItem(props) {
    
    const { summary } = usePlatform();
    const icon = {
        likes: faThumbsUp,
        responses: faReply,
        shares: faShareAlt,
        views: faEye,
        earned: faMoneyBillWave,
    }

    return (
        <div className="w-1/2 p-2.5 sm:w-3/6 lg:w-2/6">
            <div className="h-20 flex flex-row justify-between bg-gray-100 rounded-md p-2">
                <FontAwesomeIcon icon={icon[props.summaryItem.toLowerCase()]} size='3x' className='text-gray-200 my-auto'/>
                <div className="flex flex-col  text-gray-500 text-right">
                    <p className="text-gray-500 mb-1">{props.summaryItem}</p>
                    <p className="text-4xl">{summary[props.summaryItem.toLowerCase()]}</p>
                </div>
            </div>
        </div>
    );
}

export default SummaryItem;
