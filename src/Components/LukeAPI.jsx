import React, {useState, useEffect} from "react";
import axios from "axios";
import People from "./People";
import Films from "./Films";
import Planets from "./planets";
import Species from "./Species";
import Vehicles from "./Vehicles";
import Starships from "./Starships";

const LukeAPI = () => {
    const [obj, setObj] = useState({});

    const [category, setCategory] = useState("");
    const [id, setId] = useState(0);

    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        axios.get("https://swapi.dev/api")
        .then(response => {
            console.log(response.data);
            setObj(response.data);
        })
        .catch(err => console.log(err));
    }, [])

    const realizarBusqueda= (event) => {
        event.preventDefault();
        if(category !== "" & id !== ""){
            setBuscar(`${category}${id}`);
        }

        // console.log(category,id);
    }

    return (
        <div className="container ">
            <form  className="form " onSubmit={realizarBusqueda}>
                <div className="form-group col-5 " >
                    <label htmlFor="search">Search for: </label>
                    <select className="form-control" id="search" name="search" placeholder="------"  onChange={(event)=>setCategory(event.target.value)}>
                        <option>----------</option>
                        <option value={obj.films}>films</option>
                        <option value={obj.people}>people</option>
                        <option value={obj.planets}>planets</option>
                        <option value={obj.species}>species</option>
                        <option value={obj.vehicles}>vehicles</option>
                        <option value={obj.starships}>starships</option>
                    </select>
                </div>
                <div className="form-group col-5">
                    <label htmlFor="id">ID: </label>
                    <input className="form-control" type="text" name="id" id="id" onChange={(event)=> setId(event.target.value)}/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
            <div>
                {
                    category === obj.people & buscar !== ""?
                    <People url={buscar} />:
                    category === obj.films & buscar !== ""?
                    <Films url={buscar} />:
                    category === obj.planets & buscar !== ""?
                    <Planets url ={buscar}/> :
                    category === obj.species & buscar !== ""?
                    <Species url = {buscar}/>:
                    category === obj.vehicles & buscar !== ""?
                    <Vehicles url={buscar} />:
                    category === obj.starships & buscar !== ""?
                    <Starships url ={buscar} />:
                    null
                }
            </div>
        </div>
    )
}
export default LukeAPI;