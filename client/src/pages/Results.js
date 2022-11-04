import React, { useState, useEffect } from "react";
import MapView from "../components/Map";

export default function Results() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/traffic/current/1")
            .then(res => res.json())
            .then(res => setData(res))
            .catch(() => null);
    }, []);

    console.log(data);

    if (data != null) {
        return (
            <div className="Results">
                <h2>Results</h2>
                <div class="row">
                    <div class="column">
                        <MapView />
                    </div>
                    <div class="column">
                        <h3>{data.results.description}</h3>
                        <img src={data.results.description} />
                        <p>
                            <br />
                            Image Taken: {data.results.date}
                            <br />
                            Facing: {data.results.direction}
                            <br />
                            Postcode: {data.results.postcode}
                            <br />
                            Count: {data.results.count}
                            <br />
                            Coordinates: {data.results.coordinates}
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
