import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const People = ({url}) => {
    const {id} =useParams();
    const [data, setData] = useState({});
    
    useEffect(() =>{
        axios.get(`${url}`)
        .then(res=>{
            console.log(res);
            setData(res.data)
        })
        .catch(err => console.log(err));
    }, [url]);

    //idea poener otro useeffect para id

    return (
        <div className="container">
            <h1>{data.name}</h1>
            <p>height:{data.height}</p>
            <p>hair_color: {data.hair_color}</p>
            <p>birth: {data.birth_year}</p>
            <p>gender: {data.gender}</p>
        </div>
    )

}
export default People;