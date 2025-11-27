import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

export const authorize = async (route, formData, getUser) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post(`/${route}`, formData);
        const data = response.data;
        
        if (data.errors) {
            const error = new Error("Validation failed");
            error.response = { data };
            throw error;
        }
        
        await getUser();
        console.log(data);
        
        // send token to extension
        if (window.chrome && chrome.runtime) {
            chrome.runtime.sendMessage(
                extensionId,
                { type: 'auth-token', token: data.token },
                response => { console.log("Message sent to Chrome extension:", response) }
            );
        }
    
        return null;
    } catch (error) {
        console.log('Auth failed:', error);
        throw error;
    }
}