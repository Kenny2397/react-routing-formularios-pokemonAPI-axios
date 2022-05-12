import React, {useState, useEffect} from "react";
import axios  from "axios";

const Films = ({url}) => {

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
            <h1>{data.title}</h1>
            <p>director:{data.director}</p>
            <p>opening_crawl:<br/> {data.opening_crawl}</p>
            <p>producer: {data.producer}</p>
            <p>created: {data.created}</p>
        </div>
    )
}
export default Films;