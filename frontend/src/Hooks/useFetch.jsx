import { useEffect, useState } from "react"
import axios from 'axios'

export default function useFetch(endPoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`http://localhost:5000/api/${endPoint}`)
            .then((response) => {
                setData(response.data);
                setLoading(true);
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                console.log(`Error is: ${error}`);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [endPoint])

    return { data, loading, error };
}