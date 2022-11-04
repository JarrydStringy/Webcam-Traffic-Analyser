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

const CameraView = () => {
    return (
        <div>

        </div>
    )
}

export default function MapView() {
    const [data, setData] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    })

    useEffect(() => {
        fetch("/api/traffic/current/1")
            .then(res => res.json())
            .then(res => setData(res))
            .catch(() => null);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps...";

    if (data != null) {
        return (
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={11}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.time.toISOString()}
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
            </div>
        );
    }
}