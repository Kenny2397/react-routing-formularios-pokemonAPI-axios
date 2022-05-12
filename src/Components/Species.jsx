import React, {useState, useEffect} from "react";
import axios from "axios";

const Species = ({url}) => {

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

    
    if(!error){
        return (
            <div className="container">
                <h1>{data.name}</h1>
                <p>language:{data.language}</p>
                <p>skin_colors: {data.skin_colors}</p>
                <p>hair_colors: {data.hair_colors}</p>
                <p>classification: {data.classification}</p>
         </div>
        );
    }else{
        
        return (
            <div>
                <h1>Species IS NOT FOUND</h1>
                <p>These are not the droids you are looking for.</p>
                <img 
                src="https://elcomercio.pe/resizer/XJ_QLRISo3lrGWYtX86bVBiK2Hk=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LO425SZFO5DONMKILCFEAUU2XE.jpg"
                alt="obi-wan-kenobi"
                />
            </div>
        );
    }

}
export default Species;