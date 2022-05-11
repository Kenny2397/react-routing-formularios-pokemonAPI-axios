import React from "react";
import { useParams } from "react-router-dom";

const ComponenteParametros = (props) => {
    // useparams contiene todods los parametros y desestructuramos 
    const {palabra, color, bg} = useParams();
    return(
        <div className="container">
            <p style={
                color ?
                {color: color, backgroundColor: bg}// si se ingresa la ruta .../color/bg
                :{color: "black", backgroundColor: "yellow"} //por defecto
            }>
                La palabra es: {palabra} {color} {bg}
            </p>
        </div>
    )
}

export default ComponenteParametros;