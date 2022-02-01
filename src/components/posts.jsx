import React, { useEffect } from 'react';
import usePlatform from '../hooks/usePlatform';
import { PlatformList } from '../constants';

const sizesPerColumn = {
    dateHour: 'w-1/3 p-2 md:w-1/4 lg:w-2/12 text-center my-auto',
    platform: 'w-1/3 p-2 md:w-1/4 lg:w-2/12 text-center my-auto',
    likes: 'w-1/3 p-2 hidden md:block md:w-1/4 lg:w-2/12 text-center my-auto',
    responses: 'w-1/3 p-2 hidden lg:block lg:w-2/12 text-center my-auto',
    shares: 'w-1/3 p-2 hidden lg:block lg:w-1/12 text-center my-auto',
    views: 'w-1/3 p-2 hidden lg:block lg:w-1/12 text-center my-auto',
    earned: 'w-1/3 p-2 md:w-1/4 lg:w-2/12 text-right my-auto'
};

function Posts() {

    const { posts, refreshPosts } = usePlatform();

    useEffect(() => {
        const getAllPosts = async () => {
            await refreshPosts();
        };
        getAllPosts();
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'});

    return (
        <div className="w-full pl-5 pr-5 sm:p-5">
            <div className="bg-gray-200 rounded-t-lg text-gray-500">
                <div className="flex flex-wrap justify-between">
                    <div className={sizesPerColumn.dateHour}>Date/Hour</div>
                    <div className={sizesPerColumn.platform}>Platform</div>
                    <div className={sizesPerColumn.likes}>Likes</div>
                    <div className={sizesPerColumn.responses}>Responses</div>
                    <div className={sizesPerColumn.shares}>Shares</div>
                    <div className={sizesPerColumn.views}>Views</div>
                    <div className={sizesPerColumn.earned}>$</div>
                </div>
            </div>
            <div>
                {
                    posts.map(post => {
                        const date = (new Date(post.createdAt)).toLocaleString("en-US");
                        const dateHour = date.split(',');
                        const platFormLogo = PlatformList[post.platformId.toUpperCase()].logo;

                        return (
                            <div key={post._id} className="flex flex-wrap justify-between text-gray-500 bg-gray-100 border-b-2 border-white">
                                <div className={`${sizesPerColumn.dateHour} flex flex-col`}>
                                    <span>{dateHour[0]}</span>
                                    <span className="text-xs">{dateHour[1]}</span>
                                </div>
                                <div className={`${sizesPerColumn.platform} mx-auto`}>
                                    <img src={platFormLogo} alt="post.platformId" className="w-10 rounded-full mx-auto bg-white" />
                                </div>
                                <div className={`${sizesPerColumn.likes}`}>{post.likes}</div>
                                <div className={`${sizesPerColumn.responses}`}>{post.responses}</div>
                                <div className={`${sizesPerColumn.shares}`}>{post.shares}</div>
                                <div className={`${sizesPerColumn.views}`}>{post.views}</div>
                                <div className={`${sizesPerColumn.earned}`}>{formatter.format(post.earned)}</div>
                            </div>
                        )
                    })
                    }
            </div>
        </div>
    );
}
export default Posts;
