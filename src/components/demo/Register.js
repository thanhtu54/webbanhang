import { useState } from "react"
import ErrorForm from "./ErrorForm.js";
function Register(props) {
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState();
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    const handleInputFile = (e) => {
        let getFile = e.target.files
        setAvatar(getFile)
    }
    const handleSubmit = (e) => {
        let myCheck = avatar[0].name;
        let myName = myCheck.split(".");
        let text = "'png', 'jpg', 'jpeg', 'PNG', 'JPG'";
        let result = text.includes(myName[1])
        console.log(result);
        e.preventDefault();
        let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        let errorSubmit = {}
        let flag = true;
        if (inputs.email == "") {
            flag = false;
            errorSubmit.email = "Vui long nhap email";
        }
        if (!filter.test(inputs.email)) {
            flag = false;
            errorSubmit.email = "vui long nhap email dung dinh dang";
        }
        if (inputs.password == "") {
            flag = false;
            errorSubmit.password = "Vui long nhap password";
        }
        if (avatar[0].size > 1024 * 1024) {
            flag = false;
            errorSubmit.avatar = "vui long nhap file nho hon 1mb";
        }
        if (result == false) {
            flag = false;
            errorSubmit.avatar = "vui long chon dung dinh dang anh";
        }
        if (!flag) {
            setErrors(errorSubmit);
        }
        else {
            var list = {};
            list['email'] = inputs.email;
            list['password'] = inputs.password;
            var convert = JSON.stringify(list);
            localStorage.setItem("register", convert);
        }
    }

    return (
        <div>
            < ErrorForm errors={errors} />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <input type="file" name="avatar" onChange={handleInputFile} />
                {/* <select value={state} onChange={handleInput}>
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                </select> */}
                <button type="submit" className="btn btn-default">Login</button>
            </form>
        </div>
    )
}
export default Register;