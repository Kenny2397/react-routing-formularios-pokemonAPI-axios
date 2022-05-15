import React, { useState } from "react";

const Formularios = (props) => {

    const [first_name, setFirst_name] = useState("");
    const [first_name_error, setFirst_name_error] = useState("");

    const [last_name, setLast_name] = useState("");
    const [last_name_error, setLast_name_error] = useState("");

    const [email, setEmail] = useState("");
    const [email_error, setEmail_error] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirm, setConfirm] = useState("");
    const [confirm_error, setConfirm_error] = useState("");

    const [verificacion, setVerificacion] = useState(false);

    const createUser = (event) => {
        event.preventDefault();
        if(password !== confirm | password.length < 8){
            setVerificacion(false);
        }else{
            const newUser = { first_name, last_name, email, password };
            console.log("Welcome", newUser);
            setVerificacion( true );
        }
        
        
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
    };
    const validateLastName = (e) => {
        setLast_name(e.target.value);
        if(e.target.value.length < 1) {
            setLast_name_error("Last name is required!");
        } else if(e.target.value.length < 3) {
            setLast_name_error("Last name must be 2 characters or longer!");
        } else {
            setLast_name_error('');
        }
    };

    const validateEmail = (e) => {
        setEmail(e.target.value);
        if(e.target.value.length < 1) {
            setEmail_error("Email is required!");
        } else if(e.target.value.length < 3) {
            setEmail_error("Email must be 7 characters or longer!");
        } else {
            setEmail_error('');
        }
    };

    const validatePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 1) {
            setPasswordError("Password is required!");
        } else if(e.target.value.length < 8) {
            setPasswordError("Password must be 8 characters or longer!");
        } else {
            setPasswordError('');
        }
    };

    const checkedPassword = (e) => {
        setConfirm(e.target.value);
        // if(e.target.value.length < 1 ) {
        //     setConfirm_error("Password is required!");
        // } else if(e.target.value.length < 8) {
        //     setConfirm_error("Password must be 8 characters or longer!");
        // } else {
        //     setConfirm_error('');
        // }

        if(e.target.value !== password){
            setConfirm_error("no coinciden");
        } else {
            setConfirm_error("a");
        }
    };
    const showError = (atribute, message) => {
            return atribute ? message:message;
    }
    //preguntar como hacer para que al enviar muestre errores
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
                    <input type="text" className="form-control" onChange={validateEmail} ></input>
                    <p style={{color:'red'}}>{showError(email,email_error)}</p>
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" className="form-control" onChange={validatePassword} ></input>
                    <p style={{color:'red'}}>{showError(password,passwordError)}</p>
                </div>

                <div className="form-group">
                    <label>Confirm: </label>
                    <input type="password" className="form-control" onChange={checkedPassword} ></input>
                    <p style={{color:'red'}}>{showError(confirm,confirm_error)}</p>
                </div>
                <input type="submit" className="btn btn-success"></input>
            </form>
            <div>
                <h2> Your Data</h2>
                <p>First Name: {first_name}</p>
                <p>last Name: {last_name}</p>
                <p>email : {email}</p>
                <p>password : {password}</p>
                <p>confirm : {confirm}</p>
                {
                    verificacion ? 
                    <p>Thank you for submitting the form!</p> :
                    <p>Welcome, please submit the form.</p>       
                }
            </div>
        </div>
    )
}
export default Formularios;