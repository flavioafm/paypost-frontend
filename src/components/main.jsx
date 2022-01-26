import React from 'react';
import { FacebookProvider, Login, Status } from 'react-facebook';

function Main() {

    const handleResponse = (data) => {
        console.log(data);
    }
    
    const handleError = (error) => {
        this.setState({ error });
    }

    const handleChange = (response) => {
        console.log(response);
    }
    
    return (
        <div className="flex-1 p-10 text-2xl font-bold">
            
            <FacebookProvider appId="594843451607659">
                <Login
                    scope="email"
                    onCompleted={handleResponse}
                    onError={handleError}
                    >
                    {({ loading, handleClick, error, data }) => (
                        <span onClick={handleClick}>
                        Login via Facebook
                        {loading && (
                            <span>Loading...</span>
                        )}
                        </span>
                    )}
                </Login>
                {/* <Status>
                {({ loading, status }) => (
                    <div>{'...'}</div>
                )}
                </Status> */}
            </FacebookProvider>
            
        </div>
    );
}

export default Main;
