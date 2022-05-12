import React, {useState, useEffect} from "react";
import axios from "axios";

const Vehicles = ({url}) => {

    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    
    useEffect(() =>{
        axios.get(`${url}`)
        .then(res=>{
            console.log(res);
            setData(res.data)
            setError(false);
        })
        .catch(err => {
            console.log(err);
            setError(true);
        });
    }, [url])

    // if(! error){
    //     return (
    //         <div className="container">
    //             <h1>{data.name}</h1>
    //             <p>model:{data.model}</p>
    //             <p>surface_water: {data.lenght}</p>
    //             <p>crew: {data.crew}</p>
    //             <p>consumables: {data.consumables}</p>
    //         </div>
    //     )
    // }
    if(!error){
        return (
            <div className="container">
                <h1>{data.name}</h1>
                <p>model:{data.model}</p>
                <p>surface_water: {data.lenght}</p>
                <p>crew: {data.crew}</p>
                <p>consumables: {data.consumables}</p>
            </div>
        );
    }else{
        
        return (
            <div>
                <h1>VEHICLE IS NOT FOUND</h1>
                <p>These are not the droids you are looking for.</p>
                <img 
                src="https://elcomercio.pe/resizer/XJ_QLRISo3lrGWYtX86bVBiK2Hk=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LO425SZFO5DONMKILCFEAUU2XE.jpg"
                alt="obi-wan-kenobi"
                />
            </div>
        );
    }

}
export default Vehicles;