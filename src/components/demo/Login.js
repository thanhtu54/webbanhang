import React from "react";
import { useState } from "react";
import ErrorForm from "./ErrorForm.js";
function Login() {
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function emailValidate() {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(inputs.email)) {
            return true;
        }
        else {
            return false;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorSubmit = {}
        let flag = true;
        if (inputs.email == "") {
            flag = false;
            errorSubmit.email = "Vui long nhap email";
        }

        if (inputs.password == "") {
            flag = false;
            errorSubmit.password = "Vui long nhap password";
        }
        if (emailValidate() == false) {
            flag = false;
            errorSubmit.email = "vui long nhap email dung dinh dang";
        }
        if (!flag) {
            setErrors(errorSubmit);
        }
        else {
            var data = JSON.parse(localStorage.getItem("register"));
            if (data.email == inputs.email && data.password == inputs.password) {
                alert("dang nhap thanh cong !!!")
            }
            else {
                alert("ten dang nhap khong dung!!!")
            }
        }
    }


    return (
        <div>

            <ErrorForm errors={errors} />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        </div>
    )
}
export default Login;