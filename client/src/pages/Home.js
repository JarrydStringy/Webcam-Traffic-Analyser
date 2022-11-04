import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const columns = [
    { headerName: "Suburb", field: "locality", sortable: true, filter: true },
    { headerName: "Area", field: "district", sortable: true, filter: true },
    { headerName: "Direction Facing", field: "direction", sortable: true, filter: true },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true }
]

export default function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/traffic/all")
            .then(res => res.json())
            .then(res => setData(res))
            .catch(() => null);
    }, []);

    console.log(data);

    return (
        <div className="Home">
            <h2>QLD Traffic Webcam Analyser</h2>
            <p>
                A cloud-based react-express application that uses the QLD
                traffic webcams in combination with OpenCV and GoogleMaps
                to display traffic volumes.  Click an item in the table to
                see volume of cars at location.
            </p>
            <div
                className="ag-theme-balham"
                style={{
                    height: "600px",
                    width: "820px",
                    alignContent: "center"
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={data}
                    pagination={true}
                    paginationPageSize={19}
                    onRowClicked={(row) => navigate(
                        `/results/${row.data.id}`
                    )}
                />
            </div>
        </div>
    );
}

// `/api/traffic/current/${row.data.id}`