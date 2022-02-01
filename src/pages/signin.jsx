import React, {useState} from 'react';
import {
    useNavigate,
    useLocation
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = (props) => {

    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = async () => {
        const authed = await login(email, password)
        if (authed?.error){
            setError(authed.error)
        }
        if (authed?.token){
            navigate(state?.path || "/");
        }
    };

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

	return (
        <div className="
            w-screen
            h-screen
            bg-[url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80)]
            bg-cover
            bg-center
            flex
            items-center"
        >
            <div className="container mx-auto">
            <div className="max-w-md p-5 mx-auto backdrop-blur-lg rounded-md shadow-2xl animate-fade-in-down">
                <div className="text-center mb-6">
                    <img src="https://res.cloudinary.com/flavioafm/image/upload/v1643750381/paypost/eyerate-full_okjuwi.png" alt="#" />
                </div>
                <div>
                    <div className="mb-6">
                    <label className="block mb-2 text-sm text-gray-300">Email Address</label>
                    <input
                        type="email"
                        name="username"
                        placeholder="you@email.com"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
					    onKeyUp={handleEmailChange}
                    />
                    </div>
                    <div className="mb-10">
                    <label className="text-sm text-gray-300">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="*********"
                        required
                        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        onKeyUp={handlePasswordChange}
                    />
                    </div>
                    <div className="mb-2">
                    <button
                        type="submit"
                        className="w-full px-2 py-4 text-white bg-blue-700 rounded-md  focus:bg-blue-600 focus:outline-none"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    </div>
                    <div className="flex flex-row justify-items-end mb-6">
                        <label className="text-sm w-1/3 text-gray-300"><a href="/signup" className="underline">Sign up here...</a></label> 
                        <label className="text-sm w-2/3 text-right text-yellow-400">{error}</label> 
                    </div>
                </div>
            </div>
            </div>
        </div>
	);
}

export default Login;