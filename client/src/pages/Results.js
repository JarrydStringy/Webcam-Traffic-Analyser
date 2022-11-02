import React, { useState, useEffect } from "react";
import MapView from "../components/Map";

export default function Results() {
    const [traffic, setTraffic] = useState(null);

    useEffect(() => {
        fetch("/api/traffic/current")
            .then(res => res.json())
            .then(res => setTraffic(res))
            .catch(() => null);
    }, []);

    console.log(traffic);

    return (
        <div className="Results">
            <h2>Results</h2>
            <div class="row">
                <div class="column">
                    <MapView />
                </div>
                <div class="column">
                    <h3>Description</h3>
                    <p>
                        Date: {traffic.id}
                        Cars: {traffic.count}
                    </p>
                </div>
            </div>
        </div>
    );
}
