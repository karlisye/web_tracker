import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000';

const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;

export const authorize = async (route, formData, getUser) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post(`/${route}`, formData);
        const data = response.data;
        
        if (data.errors) {
            const error = new Error('Validation failed');
            error.response = { data };
            throw error;
        }
        
        await getUser();
        // console.log(data);

        link(data.token);
    } catch (error) {
        // console.log('Auth failed:', error);
        throw error;
    }
}

export const link = (token) => {
    if (window.chrome && chrome.runtime) {
        chrome.runtime.sendMessage(
            extensionId,
            { type: 'auth-token', token: token },
            response => { console.log('Link Message sent to Chrome extension:', response) }
        );
    }
}

export const unlink = () => {
    if (window.chrome && chrome.runtime) {
        chrome.runtime.sendMessage(
            extensionId,
            { type: 'remove-token' },
            (response) => {
            console.log('Unlink Message sent to Chrome extension:', response);
            if (!response.error) console.log('extension token removed');
            }
        );
    }
}

export const logout = async (setUser) => {
    try {
        const response = await axios.post('/logout');
        const data = response.data;
    
        if (data.errors) {
            const error = new Error('Logout failed');
            error.response = { data };
            throw error;
        }
    
        setUser(null);
    
        unlink();
    } catch (error) {
        console.log('Logout failed:', error);
        throw error;
    }
}

export const deleteAccount = async (setUser) => {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.delete('/account');
        const data = response.data;
        
        if (data.errors) {
            const error = new Error('Account deletion failed');
            error.response = { data };
            throw error;
        }
        
        setUser(null);
        
        unlink();
        
        return data;
    } catch (error) {
        console.log('Account deletion failed:', error);
        throw error;
    }
}