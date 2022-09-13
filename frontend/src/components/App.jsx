import './../styles/App.scss';
import './../styles/index.scss';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as chatActions } from "../slices/messagesSlice.js";
//import { actions as channelsActions } from "../slices/channelsSlice.js";
import { io } from 'socket.io-client';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar.jsx";
import LoginPage from "./LoginPage.jsx";
import RegistrationPage from "./RegistrationPage.jsx";
import ChatPage from "./ChatPage.jsx";

import { AuthContext, ApiContext } from "../contexts/index.js";
import { useAuth } from "../hooks/index.js";
import routes from '../routes.js';

const ChatApiProvider = ({ children }) => {
    const socket = io();
    const dispatch = useDispatch();

    useEffect(() => {
       socket.on('newMessage', (message) => {
           dispatch(chatActions.addMessage(message));
       });
    }, [socket, dispatch]);

    const sendMessage = (message, handleResponse) => {
        socket.emit('newMessage', message, (response) => {
            handleResponse(response);
        });
    };

    return (
        <ApiContext.Provider
            value={{
                sendMessage
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

    const getUserName = () => {
        const { username } = JSON.parse(localStorage.getItem('user'));
        return username;
    }

    const logIn = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser({ username: userData.username });
    };

    const logOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    const getAuthHeader = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
    }

    return (
        <AuthContext.Provider
            value={{
                logIn,
                logOut,
                getAuthHeader,
                getUserName,
                user,
            }}
            >
            {children}
        </AuthContext.Provider>
    )
};

const IsLoggedIn = ({ children }) => {
    const { user } = useAuth();
    return (
        user ? <Navigate to={routes.chatPagePath()} /> : children
    );
};

const PrivateOutlet = () => {
    const { user } = useAuth();
    return (
        user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />
    );
};

const PageNotFound = () => {
    return (
        <div>
            <h2>404 - Not Found</h2>
            <Link to="/">Go Home</Link>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ChatApiProvider>
                <Router>
                    <div className="d-flex flex-column h-100" id="fading">
                        <Navbar />
                        <Routes>
                            <Route path={routes.registrationPagePath()} element={<IsLoggedIn><RegistrationPage /></IsLoggedIn>} />
                            <Route path={routes.loginPagePath()} element={<IsLoggedIn><LoginPage /></IsLoggedIn>} />
                            <Route path={routes.chatPagePath()} element={<PrivateOutlet />} >
                                <Route path="" element={<ChatPage />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Router>
            </ChatApiProvider>
        </AuthProvider>
    );
};

export default App;
