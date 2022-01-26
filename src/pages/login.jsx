import React, {useState} from 'react';
import AuthService from "../service/AuthService";
import {
    Link,
    Routes,
    Route,
    useNavigate,
    Navigate,
    useLocation
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

const Login = (props) => {
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

	// const handleLogin = async () => {
	// 	setAuthenticating(true);
	// 	const result = await AuthService.login(email, password);
	// 	if (result.status === 200){
	// 		props.history.push("/home");
	// 	} else {
	// 		setError(result.data.error)
	// 	}
	// 	setAuthenticating(false);

	// }

	// const handleSignup = async () => {
	// 	props.history.push("/signup");
	// }

    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = async () => {
        // login(email, password).then((res) => {
        //     console.log(res)
        //     navigate(state?.path || "/");
        // });

        const response = await login(email, password)
        if (response?.data?.token){
            navigate(state?.path || "/");
        }
        // console.log(API_URL + "/authenticate");
        // axios.post(API_URL + "/authenticate", {email,password})
        // .then(response => {
        //     if (response.data.token) {
        //         navigate(state?.path || "/");        
        //     }
        //     console.log(response);
        // })
        // .catch(err =>{
        //     console.log(err);
        // });    
        
        
    };


    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    // const handleLogin = async () => {
	// 	//setAuthenticating(true);
	// 	const result = await AuthService.login(email, password);
	// 	if (result.status === 200){
	// 		props.history.push("home");
	// 	} else {
	// 		//setError(result.data.error)
	// 	}
	// 	//setAuthenticating(false);

	// }

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
                <div className="text-center mb-10">
                <h1 className="my-3 text-3xl font-semibold text-white">Todo V2 (WIP)</h1>
                <p className="text-gray-300">Check it out <a className="underline" href="https://edirect-todo-client.herokuapp.com/home">Todo V1</a>.</p>
                </div>
                <div>
                {/* <form> */}
                    {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
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
                        className="w-full px-2 py-4 text-white bg-gray-700 rounded-md  focus:bg-indigo-600 focus:outline-none"
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    </div>
                    <div className="flex flex-row justify-items-end mb-6">
                    <label className="text-sm w-1/3 text-gray-300"><a className="underline" href="/signup">Sign up here...</a></label> 
                    {/* <label className="text-sm w-2/3 text-right text-red-400">{credencialError}</label>  */}
                    </div>
                {/* </form> */}
                </div>
            </div>
            </div>
        </div>
	);
}

export default Login;