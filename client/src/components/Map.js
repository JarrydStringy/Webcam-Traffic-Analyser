import React from 'react';
import {
    GoogleMap, useLoadScript
} from '@react-google-maps/api';
import mapStyles from "../mapStyles"

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};
const center = {
    lat: 0,
    lng: 0,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};


export default function MapView() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    });
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps...";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={2}
                center={center}
                options={options}
                onLoad={onMapLoad}
            />
        </div>
    );
}