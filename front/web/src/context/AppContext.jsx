import { createContext, useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

export const AppContext = createContext();

export default function AppProvider({children}) {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios.get('/user');
            setUser(response.data);
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, getUser }}>
            {children}
        </AppContext.Provider>
    )
}