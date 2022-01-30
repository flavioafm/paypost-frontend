import React, {useState, useEffect} from 'react';
import {
    useNavigate,
    useLocation
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signup = (props) => {
	// const classes = useStyles();
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [error, setError] = useState(null);
	// const [authenticating, setAuthenticating] = useState(false)

	// const handleEmailChange = (event) => {
    //     setEmail(event.target.value)
    // }

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value)
    // }
    
    const [ error, setError ] = useState('');
    const [ disabledSignUp, setDisabledSignUp] = useState(true);
    const navigate = useNavigate();
    const { register } = useAuth();
    const { state } = useLocation();

    const handleSignup = async () => {
        const response = await register(name, email, password)
        if (response?.data?.token){
            navigate(state?.path || "/");
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handlePwdConfirmChange = (event) => {
        setPwdConfirm(event.target.value)
    }

    useEffect(() => {
        if (name && email && password && pwdConfirm && password === pwdConfirm ) {
            setDisabledSignUp(false);
        }
    }, [name, email, password, pwdConfirm]);
    
    
	return (
        <div className="
            w-screen
            h-screen
            bg-[url(https://images8.alphacoders.com/470/thumb-1920-470318.jpg)]
            bg-cover
            bg-center
            flex
            items-center"
        >
            <div className="container mx-auto">
            <div className="max-w-md p-5 mx-auto backdrop-blur-lg rounded-md shadow-2xl animate-fade-in-down">
                <div className="text-center mb-6">
                    <img src="https://eyeratebusiness.com/static/eyerate-full.png" alt="#" />
                </div>
                <div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-300">Name</label>
                        <input
                            type="email"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            onKeyUp={handleNameChange}
                        />
                    </div>
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
                    <div className="mb-6">
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
                    <div className="mb-10">
                        <label className="text-sm text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="*********"
                            required
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            onKeyUp={handlePwdConfirmChange}
                        />
                    </div>
                    <div className="mb-2">
                        <button
                            type="submit"
                            disabled={disabledSignUp}
                            className="w-full px-2 py-4 text-white bg-blue-700 rounded-md  focus:bg-blue-600 focus:outline-none disabled:bg-gray-300"
                            onClick={handleSignup}
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="flex flex-row justify-items-end mb-6">
                        <label className="text-sm w-1/3 text-gray-300"><a className="underline" href="/signin">Sign in here...</a></label> 
                        <label className="text-sm w-2/3 text-right text-yellow-400">{error}</label> 
                    </div>
                </div>
            </div>
            </div>
        </div>
	);
}

export default Signup;