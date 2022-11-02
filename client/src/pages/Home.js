import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useData } from "../Api";

const columns = [
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Locality", field: "locality", sortable: true, filter: true },
    { headerName: "Direction", field: "direction", sortable: true, filter: true },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true },
    { headerName: "Count", field: "count", sortable: true, filter: true }
]

export default function Home() {
    // const { traffic } = useData()

    const [traffic, setTraffic] = useState(null);

    useEffect(() => {
        fetch("/api/traffic/current")
            .then(res => res.json())
            .then(res => setTraffic(res))
            .catch(() => null);
    }, []);

    console.log(traffic);

    return (
        <div className="Test">
            <h2>QLD Traffic Webcam Analyser</h2>
            <div class="row">
                <div class="column">
                    <div
                        className="ag-theme-balham"
                        style={{
                            height: "400px",
                            width: "650px",
                            alignContent: "center"
                        }}
                    >
                        <AgGridReact
                            columnDefs={columns}
                            rowData={traffic}
                            pagination={true}
                            paginationPageSize={12}
                        />
                    </div>
                </div>
                <div class="column">
                    <h4>Description</h4>
                    <p>
                        A cloud-based react-express application that uses the QLD traffic webcams in combination with OpenCV and GoogleMaps to display traffic volumes.
                    </p>
                </div>
            </div>
        </div>
    );
}