import React from 'react';
import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <div>
            <nav className={`navbar navbar-expand-lg fixed-top ${props.mode === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/general">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                    <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" style={{width: "150px"}} htmlFor="flexSwitchCheckDefault">{`Enable ${props.mode === 'light' ? 'dark' : 'light'} mode`}</label>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
