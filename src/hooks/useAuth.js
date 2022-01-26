import * as React from "react";
import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}/auth`;
const authContext = React.createContext();

function useAuth() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [authed, setAuthed] = React.useState(!!user);

    return {
        authed,
        async login(email, password) {
            const response = await axios.post(API_URL + "/authenticate", {email,password})
            if (response.data.token) {
                setAuthed(true);
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                return { error: "Something wrong happened."}
            }
            return response;
        },
        async logout() {
            await localStorage.removeItem("user");
            setAuthed(false);
        }
    };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
