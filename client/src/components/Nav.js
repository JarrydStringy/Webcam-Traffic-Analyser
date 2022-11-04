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
                    <Link to="/results/1">Results</Link>
                </li>
                <li>
                    <Link to="/api/traffic/current/1">Traffic API</Link>
                </li>
            </ul>
        </nav >
    );
}
