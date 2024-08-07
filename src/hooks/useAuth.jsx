import { createContext, useContext, useState } from 'react';
import * as userService from '../services/userService.js';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(userService.getUser());

    const login = async (email, password) => {
        try {
            const user = await userService.login(email, password);
            setUser(user);
            toast.success('Login Successful')
        } catch (err) {
            // console.log(err);
            toast.error(err.response.data)
        }
    };

    const register = async (data) => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success('Register Successful')
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success('Logout Successful');
    }

    const updateProfile = async user => {
        const updatedUser = await userService.updateProfile(user);
        toast.success('Profile update was successful');
        if (updatedUser) setUser(updatedUser);
    }

    const changePassword = async passwords => {
        await userService.changePassword(passwords)
            .then(() => {
                logout();
                toast.success('Password changed successfully, please login again');
            })
            .catch(err => toast.error(err.response.data));

        // logout();
        // toast.success('Password changed successfully, please login again');
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            register,
            updateProfile,
            changePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
};

// hook para usar el contexto AuthContext
export const useAuth = () => useContext(AuthContext);

