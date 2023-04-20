import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/Authentication">Log In</Link>
                </li>
                <li>
                    <Link to="/SignUp">Sign Up</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
