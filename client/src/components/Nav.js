import React from "react"
import { Link } from "react-router-dom";

// navigation links
export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/results">Results</Link>
                </li>
                <li>
                    <Link to="/api/traffic">Traffic API</Link>
                </li>
            </ul>
        </nav >
    );
}
