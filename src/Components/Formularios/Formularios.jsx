import React, { useState } from "react";

const Formularios = (props) => {

    const [first_name, setFirst_name] = useState("");
    const [first_name_error, setFirst_name_error] = useState("");

    const [last_name, setLast_name] = useState("");
    const [last_name_error, setLast_name_error] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirm, setConfirm] = useState("");
    const [verificacion, setVerificacion] = useState(false);

    const createUser = (event) => {
        event.preventDefault();
        const newUser = { first_name, last_name, email, password };
        console.log("Welcome", newUser);
        setVerificacion( true );
        
    }
    const validateFirstName = (e) => {
        setFirst_name(e.target.value);
        if(e.target.value.length < 1) {
            setFirst_name_error("First name is required!");
        } else if(e.target.value.length < 3) {
            setFirst_name_error("First name must be 2 characters or longer!");
        } else {
            setFirst_name_error('');
        }
    }
    const validateLastName = (e) => {
        setLast_name(e.target.value);
        if(e.target.value.length < 1) {
            setLast_name_error("Last name is required!");
        } else if(e.target.value.length < 3) {
            setLast_name_error("Last name must be 2 characters or longer!");
        } else {
            setLast_name_error('');
        }
    }
    const validatePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 1) {
            setPasswordError("Password is required!");
        } else if(e.target.value.length < 8) {
            setPasswordError("Password must be 8 characters or longer!");
        } else {
            setPasswordError('');
        }
    }
    const showError = (atribute, message) => {
            return atribute ? message:message;
    }

    return(
        <div className="container">
            <h1>Form</h1>
            <form onSubmit={createUser}>
                <div className="form-group">
                    <label>First Name: </label>
                    <input type="text" className="form-control" onChange={validateFirstName}></input>
                    <p style={{color:'red'}}>{showError(first_name,first_name_error)}</p>
                </div>

                <div className="form-group">
                    <label>Last Name: </label>
                    <input type="text" className="form-control" onChange={validateLastName}></input>
                    <p style={{color:'red'}}>{showError(last_name,last_name_error)}</p>
                </div>

                <div className="form-group">
                    <label>email: </label>
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} ></input>
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" className="form-control" onChange={validatePassword} ></input>
                    {
                    password ?
                    <p style={{color:'red'}}>{ passwordError }</p> :
                    <p style={{color:'red'}}>{ passwordError }</p>
                    }
                </div>

                <div className="form-group">
                    <label>Confirm: </label>
                    <input type="password" className="form-control" onChange={(e) => setConfirm(e.target.value)} ></input>
                </div>
                <input type="submit" className="btn btn-success"></input>
            </form>
            <div>
                <h1> Your Data</h1>
                <p>First Name: {first_name}</p>
                <p>last Name: {last_name}</p>
                <p>email : {email}</p>
                <p>password : {password}</p>
                <p>confirm : {confirm}</p>
                <p>{
                    verificacion ? 
                    <h3>Thank you for submitting the form!</h3> :
                    <h3>Welcome, please submit the form.</h3>       
                }</p>
            </div>
        </div>
    )
}
export default Formularios;