import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './../styles/App.scss';
import { Main } from './Main.jsx';
import { SignInForm } from "./SignIn.jsx";
import { SignUpForm } from "./SignUp.jsx";

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
        <Router>
            <Routes>
                <Route path="/" element={<Main getForm={SignInForm} />} />
                <Route path="/login" element={<Main getForm={SignInForm} />} />
                <Route path="/signup" element={<Main getForm={SignUpForm} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
