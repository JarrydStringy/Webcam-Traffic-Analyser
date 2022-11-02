import React, { useEffect, useState } from 'react';
import {
    GoogleMap, useLoadScript, Marker, InfoWindow
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

    console.log(traffic)

    const CameraView = () => {
        return (
            <div>
                <img src={traffic.image_url} />
            </div>
        )
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const loadMarkers = React.useCallback((camera) => {
        setMarkers(current => [
            ...current,
            {
                position: camera.position,
                lng: camera.latLng.lng(),
            },
        ]);
    }, []);

    for (var camera in traffic.jsonData) {
        loadMarkers(traffic.jsonData[camera].coordinates)
        console.log(traffic.jsonData[camera].coordinates)
    };

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
        >
            {markers.map((marker) => (
                <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => {
                        setSelected(marker);
                    }}
                />
            ))}

            {selected ? (
                <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <CameraView />
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
}