import React, { useEffect } from 'react';
import usePlatform from '../hooks/usePlatform';

function Posts() {

    const { posts, refreshPosts } = usePlatform();

    useEffect(() => {
        const getAllPosts = async () => {
            await refreshPosts();
        };
        getAllPosts();
    }, []);

    return (
        <div className="container flex justify-center mx-auto">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="p-10">
                        <table className="divide-y divide-gray-300" id="dataTable">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Date/Hour
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Platform
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Likes
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Responses
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Shares
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        Views
                                    </th>
                                    <th className="px-6 py-2 text-xs text-gray-500">
                                        $
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-500">
                                {
                                posts.map(post => (
                                    <tr key={post._id} className="whitespace-nowrap">
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            {post.createdAt}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-900">{post.platformId}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-sm text-gray-500">{post.likes}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                                            {post.responses}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">{post.shares}</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">{post.views}</a>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <a href="#"
                                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">{post.earned}</a>
                                        </td>
                                    </tr>
                                ))
                                }
                                {/* <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">
                                            Jon doe
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-500">jhondoe@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        2021-1-12
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                </tr>
                                <tr className="bg-gray-50 whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        2
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">
                                            Jon doe 2
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-500">jhondoe2@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        2021-1-12
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="px-4 py-1 text-sm text-red-400 rounded-full">Delete</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                </tr>
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        3
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">
                                            Jon doe 3
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-500">jhondoe3@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        2021-1-12
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                </tr>


                                <tr className="bg-gray-50 whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        4
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">
                                            Jon doe 4
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="text-sm text-gray-500">jhondoe4@example.com</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-500">
                                        2021-1-12
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Edit</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#" className="px-4 py-1 text-sm text-red-400 rounded-full">Delete</a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href="#"
                                            className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</a>
                                    </td>
                                </tr> */}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
