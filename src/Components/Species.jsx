import React, {useState, useEffect} from "react";
import axios from "axios";

const Species = ({url}) => {

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
            <p>language:{data.language}</p>
            <p>skin_colors: {data.skin_colors}</p>
            <p>hair_colors: {data.hair_colors}</p>
            <p>classification: {data.classification}</p>
        </div>
    )

}
export default Species;