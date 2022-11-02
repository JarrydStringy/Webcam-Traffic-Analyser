import { useState, useEffect } from "react";
import axios from "axios";

const CURRENT_URL = "/api/traffic/current";

export function useData() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(
        () => {
            getData()
                .then((data) => {
                    setData(data);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, []);
    return {
        loading,
        data,
        error,
    };
}

function getData() {
    const url = CURRENT_URL;

    return axios.get(url)
        .then((res) => res.json())
        .then((data) =>
            data.map((info) => ({
                id: info.id,
                url: info.url,
                description: info.description,
                direction: info.direction,
                district: info.district,
                locality: info.locality,
                postcode: info.postcode,
                image_url: info.image_url,
                date: info.date,
                count: info.count,
                coordinates: info.coordinates
            }))
        );
}