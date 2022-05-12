import React, {useState, useEffect} from "react";
import axios from "axios";

const Planets = ({url}) => {

    const [data, setData] = useState({});
    
    useEffect(() =>{
        axios.get(`${url}`)
        .then(res=>{
            console.log(res);
            setData(res.data)
        })
        .catch(err => console.log(err));
    }, [url])

    return (
        <div className="container">
            <h1>{data.name}</h1>
            <p>gravity:{data.gravity}</p>
            <p>surface_water: {data.surface_water}</p>
            <p>climate: {data.climate}</p>
            <p>diameter: {data.diameter}</p>
        </div>
    )

}
export default Planets;