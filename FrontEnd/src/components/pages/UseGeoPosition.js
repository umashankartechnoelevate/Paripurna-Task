import React, { useState, useEffect } from 'react'
import axios from 'axios';

const UseGeoPosition = ({ key, address }) => {

  const [position, setPosition] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLatandLng();
  }, [address])

  const fetchLatandLng = async () => {
    console.log("useGeoPosition working");
    try {
      setLoading(true);
      const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`);
      const result = res.data.results[0].geometry.location;
      console.log("result", res);
      if (result.lat !== null && result.lng !== null) {
        setPosition({ lat: result.lat, lng: result.lng })
      }
      else {
        setError(true);
      }
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      setError(true);
    }
  }


  console.log("position", position);
  return [position, loading, error]
}

export default UseGeoPosition;