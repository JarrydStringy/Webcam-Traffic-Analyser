import React, { useEffect, useState } from 'react';
import {
    GoogleMap, useLoadScript
} from '@react-google-maps/api';
import mapStyles from "../mapStyles"

const libraries = ["places"];
const mapContainerStyle = {
    width: "75vw",
    height: "70vh",
};
// Centred about Brisbane
const center = {
    lat: -27.4705,
    lng: 153.0260,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function MapView() {
    const [traffic, setTraffic] = useState(null);

    useEffect(() => {
        fetch("/api/traffic")
            .then(res => res.json())
            .then(res => setTraffic(res))
            .catch(() => null);
    }, []);

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
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={center}
            options={options}
            onLoad={onMapLoad}
        />
    );
}