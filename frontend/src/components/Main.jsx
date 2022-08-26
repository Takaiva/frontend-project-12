import React from 'react';

export const Main = ({ getForm }) => {
    return (
        <div className="h-100" id="chat">
            <div className="d-flex flex-column h-100">
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container">
                        <a className="navbar-brand atures-font" href="/">Station301</a>
                    </div>
                </nav>
                <div className="container-fluid h-100">
                    <div className="row h-100 justify-content-center align-content-center">
                        <div className="col-12 col-md-8 col-xxl-6">
                            {getForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
