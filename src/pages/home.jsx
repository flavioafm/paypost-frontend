import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Main from '../components/main';

function Home() {

    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar/>
            <Main/>
      </div>
    );
}

export default Home;
