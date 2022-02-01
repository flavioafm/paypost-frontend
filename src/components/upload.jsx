
import React, { useEffect, useState } from 'react'

function Uploader(props) {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'paypost')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/flavioafm/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url);
        setLoading(false)
    }

    useEffect(() => {
        props.callback(image);
    }, [image]);

    return (
        <div className="flex flex-col">
            <div className="w-1/2"><p className="pl-1">Select an image (optional):</p></div>
            <div className="w-full h-auto">
                <input
                    type="file"
                    name="file"
                    className="p-2 text-gray-500"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                />
                {loading ? (
                    <p className='w-full text-center p-10'>Loading...</p>
                ) : (
                    <div className='w-full flex justify-center'>
                        <img src={image} className="w-32"/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Uploader;
