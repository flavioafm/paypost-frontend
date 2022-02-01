import React, { useEffect, useState } from "react";
import StackGrid from "react-stack-grid";
import Sidebar from "../components/sidebar";
import usePlatform from '../hooks/usePlatform';

function Profile() {
    const { getMedias } = usePlatform();
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        const loadMedias = async () => {
            setMedias(await getMedias());
        }
        loadMedias();
    }, [medias]);
    

    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar highlighted='Profile'/>
            <div className="w-full p-10">
                <StackGrid
                    columnWidth={400}
                >
                    {
                        medias && medias.map(item => (
                            <div key={item._id}><img src={item.url} alt=''/></div>        
                        ))
                    }
                </StackGrid>
            </div>
        </div>
        
    );
}

export default Profile;
