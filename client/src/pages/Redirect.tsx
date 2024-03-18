/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

export const Redirect = () => {
    const {id} = useParams();

    function fetchDataAfterDelay() {
        setTimeout(() => {
            axios.get('http://localhost:3005/urls/getUrl/dJAQN')
                .then(response => {
                    console.log('Data fetched successfully:', response.data);
            window.location.replace('http://www.google.com');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, 2000);
    }
    
    fetchDataAfterDelay();

    return (
        <div>
            redirecting...
        </div>
    )
}

export default Redirect;