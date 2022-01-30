import axios from "axios";
import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";
const platformContext = createContext();

const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

function usePlatform() {

    const [posts, setPosts] = useState([]);
    const [userDataPlataform, setUserDataPlataform] = useState(null);

    const getRequest = async () => {
        const token = await AuthService.getCurrentUser().token;
        return axios.create({
            baseURL: API_URL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + token,
            }
        });
    }

    const refreshPosts = async () => {
        const request = await getRequest();
        const user = await AuthService.getCurrentUser().user;
        await request
            .get("/platform/post", { params: { userId: user._id } })
            .then(response => {
                setPosts(response.data);
            })
            .catch(err =>{
                return err;
            });
    } 
    
    return {
        async signIn(platform, userData){
            const request = await getRequest();
            const user = await AuthService.getCurrentUser().user;
            return await request
                .post("/platform/signin", {userId: user._id, platformId: platform, userData})
                .then(response => {
                    setUserDataPlataform({
                        ...userDataPlataform,
                        ...response.data
                    });
                    AuthService.updateUserPlatformData(
                        platform.toLowerCase(), userData || response.data
                    );
                    return response.data;
                })
                .catch(err =>{
                    return err;
                });
        },

        async getCurrentUserByPlatform(platform){
            return await AuthService.getCurrentUser().user[platform];
        },

        async newPost(platform, postData){
            const request = await getRequest();
            const user = await AuthService.getCurrentUser().user;
            return await request
                .post("/platform/post", {userId: user._id, platformId: platform, postData})
                .then(response => {
                    refreshPosts();
                    return true;
                })
                .catch(err =>{
                    return err;
                });
        },

        async refreshPosts(){
            return refreshPosts();
        },
        
        async signInCallback(platform, oauthVerifier) {
            const request = await getRequest();
            const user = await AuthService.getCurrentUser().user;
            return await request
                .get("/platform/signin_callback", { 
                    params: {
                        userId: user._id, 
                        platformId: platform, 
                        oauthVerifier
                    }
                })
                .then(response => {
                    setUserDataPlataform({
                        ...userDataPlataform,
                        ...response.data
                    });
                    // AuthService.updateUserPlatformData(
                    //     platform.toLowerCase(), userData || response.data
                    // );
                    return response.data;
                })
                .catch(err =>{
                    return err;
                });
        },
        posts,
        userDataPlataform
    }
}

export function PlatformProvider({ children }) {
    const platform = usePlatform();
    return <platformContext.Provider value={platform}>{children}</platformContext.Provider>;
}

export default function PlatformConsumer() {
    return useContext(platformContext);
}
  