import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PokemonAPI = () => {

    const [lista, setLista] = useState([]);
    const [boton, setBoton] = useState(false);

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=807")
        .then((response) => {
            console.log(response.data.results);
            setLista(response.data.results);

        })
        .catch((error) => console.log(error));
    }, []);

    const activarBoton = () => {
        setBoton(true);
    }

    return (
        <div className="container col-4">
            <button className="btn btn-primary col-6" onClick={activarBoton}>Fetch Pokemon</button>
            {
                boton?
                <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name: </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {lista.map((pokemon,index) => (
                        <tr key={index} >
                            <td>{index+1}</td>
                            <td>{pokemon.name}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>:
            null
            }
        </div>
    )

}
export default PokemonAPI;