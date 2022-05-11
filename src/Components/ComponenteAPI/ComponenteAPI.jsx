import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ComponenteAPI = () => {

    const [imagen, setImagen] = useState("");
    const [clicks, setClicks] = useState(0);

    const hizoClick = () => {
        setClicks(clicks+1);
    }

    useEffect(() => {
        axios.get("https://dog.ceo/api/breeds/image/random")
            .then (response => {
                console.log(response);
                setImagen(response.data.message);
            })
    }, [clicks]);

    return (
        <div>
            <img src={imagen} className="img-fluid" alt='img'/> <br/>
            Haz recargado al perrito {clicks} veces 
            <button className="btn btn-primary" onClick={hizoClick}>Recargar cachorrito</button>
        </div>

    )

}

export default ComponenteAPI;