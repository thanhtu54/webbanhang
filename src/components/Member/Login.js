import React from "react";
import { useState } from "react";
import ErrorForm from "../Error/ErrorForm";
import axios from "axios";
import Home from "../Home";
import { useNavigate } from "react-router-dom";
function Login(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [save, setSave] = useState({});
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        let checkMail = true;
        let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        let errorSubmit = {}
        console.log(inputs.email)
        if (inputs.email == "") {
            flag = false;
            errorSubmit.email = "Vui long nhap email";
            checkMail = false;
        }
        if (checkMail == true) {
            if (!filter.test(inputs.email)) {
                flag = false;
                errorSubmit.email = "vui long nhap email dung dinh dang";
            }
        }
        if (inputs.password == "") {
            flag = false;
            errorSubmit.password = "Vui long nhap password";
        }
        if (inputs.level == undefined) {
            flag = false;
            errorSubmit.address = "Vui long nhap level";
        }
        if (!flag) {
            setErrors(errorSubmit);
        }
        else {
            const data = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            }
            axios.post('http://localhost:8080/laravel/laravel/public/api/login', data)
                .then((res) => {
                    // res nay la ket qua API tra ve, co the dung hoac sai, nen log ra xem
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        // console.log(res)
                        alert(" thanh cong")
                        setSave(res.data)
                        navigate('/');
                    }
                })
        }
    }
    // console.log(save)
    var check = save;
    var convert = JSON.stringify(check);
    localStorage.setItem("login", convert);
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                < ErrorForm errors={errors} />
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" name="email" onChange={handleInput} />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    <input type="number" placeholder="Level" name="level" onChange={handleInput} />
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
        </div>
    );
}
export default Login;