import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";
const platformContext = createContext();

const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

function usePlatform() {

    const [posts, setPosts] = useState([]);
    const [summary, setSummary] = useState({
        likes: 0,
        responses: 0,
        shares: 0,
        views: 0,
        earned: '$ 0.00',
    });
    const [userDataPlataform, setUserDataPlataform] = useState(null);

    useEffect(() => {
        const loadCurrentUser = async() => {
            setUserDataPlataform(await AuthService.getCurrentUser())
        }
        loadCurrentUser();
    }, []);
    

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

    const calcSummary = (data) => {
        const formatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'});
        const summary = data.reduce(function(previousValue, currentValue) {
            return {
              likes: previousValue.likes + currentValue.likes,
              responses: previousValue.responses + currentValue.responses,
              shares: previousValue.shares + currentValue.shares,
              views: previousValue.views + currentValue.views,
              earned: previousValue.earned + currentValue.earned,
            }
        });
        summary.earned = formatter.format(summary.earned)
        return summary;
    }

    const refreshPosts = async () => {
        const request = await getRequest();
        const user = await AuthService.getCurrentUser();
        await request
            .get("/platform/post", { params: { userId: user._id } })
            .then(response => {
                setPosts(response.data);
                setSummary(calcSummary(response.data))
            })
            .catch(err =>{
                return err;
            });
    } 
    
    return {
        async signIn(platform, userData){
            const request = await getRequest();
            const user = await AuthService.getCurrentUser();
            return await request
                .post("/platform/signin", {userId: user._id, platformId: platform, userData})
                .then(response => {
                    const newDataUser = {
                        ...userDataPlataform,
                        ...user,
                        ...response.data
                    }
                    setUserDataPlataform({
                        ...newDataUser
                    });
                    AuthService.updateUserPlatformData(newDataUser);
                    return response.data;
                })
                .catch(err =>{
                    return err;
                });
        },

        async refreshUserData(){
            const user = await AuthService.getCurrentUser();
            return setUserDataPlataform(user);
        },

        async newPost(platform, postData){
            const request = await getRequest();
            const user = await AuthService.getCurrentUser();
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
            const user = await AuthService.getCurrentUser();
            return await request
                .get("/platform/signin_callback", { 
                    params: {
                        userId: user._id, 
                        platformId: platform, 
                        oauthVerifier
                    }
                })
                .then(response => {
                    const newDataUser = {
                        ...userDataPlataform,
                        ...user,
                        ...response.data
                    }
                    setUserDataPlataform({
                        ...newDataUser
                    });
                    AuthService.updateUserPlatformData(newDataUser);
                    return response.data;
                })
                .catch(err =>{
                    return err;
                });
        },
        async getMedias(){  
            const request = await getRequest();
            const user = await AuthService.getCurrentUser();
            return await request
                .get("/platform/media", { 
                    params: { userId: user._id }
                })
                .then(response => {
                    return response.data;
                })
                .catch(err =>{
                    return err;
                });
        },
        posts,
        summary,
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
  