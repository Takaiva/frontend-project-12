import './../styles/App.scss';
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./Navbar.jsx";
import SignInPage from "./SignIn.jsx";
import SignUpPage from "./SignUp.jsx";

import { AuthContext } from "../contexts/index.js";
import { useAuth } from "../hooks/index.js";
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
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
        user ? <Outlet /> : <Navigate to={routes.signInPagePath()} />
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
            <Router>
                <div className="d-flex flex-column h-100">
                    <Navbar />
                    <Routes>
                        <Route path={routes.signUpPagePath()} element={<IsLoggedIn><SignUpPage /></IsLoggedIn>} />
                        <Route path={routes.signInPagePath()} element={<IsLoggedIn><SignInPage /></IsLoggedIn>} />
                        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
                            <Route path="" element={<SignUpPage />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
};

export default App;
