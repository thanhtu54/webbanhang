import axios from "axios";
import { useState } from "react";
import ListComment from "../Blog/ListComment";
import ErrorForm from "../Error/ErrorForm";
function Register(props) {
    const [post, setPost] = useState({});
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [avatar, setAvatar] = useState();
    const [getfile, setFile] = useState();
    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    function handleUserInputFile(e) {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result); //gui api
            setFile(file[0])// setFile(file[0]); // xu ly
        };
        reader.readAsDataURL(file[0]);
    }
    const handleSubmit = (e) => {
        let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        let errorSubmit = {}
        let flag = true;
        let check = true;
        e.preventDefault();
        // console.log(inputs.phone)
        // console.log(inputs.email)
        console.log(inputs.address)
        // console.log(inputs.password)
        // console.log(inputs.name)
        if (inputs.name == undefined) {
            flag = false;
            errorSubmit.email = "vui long nhap ten";
        }
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
        if (inputs.address == undefined || inputs.address == "") {
            flag = false;
            errorSubmit.address = "Vui long nhap address";
        }
        if (inputs.level == undefined) {
            flag = false;
            errorSubmit.address = "Vui long nhap level";
        }
        if (inputs.phone == undefined) {
            flag = false;
            errorSubmit.phone = "Vui long nhap phone";
        }
        if (getfile == undefined) {
            check = false;
            flag = false;
            errorSubmit.avatar = "Vui long them avatar";
        }
        if (check == true) {
            let myCheck = getfile.name;
            let myName = myCheck.split(".");
            let text = "'png', 'jpg', 'jpeg', 'PNG', 'JPG'";
            let result = text.includes(myName[1]);
            if (result == false) {
                flag = false;
                errorSubmit.avatar = "vui long chon dung dinh dang anh";
            }
            if (getfile.size > 1024 * 1024) {
                flag = false;
                errorSubmit.avatar = "vui long nhap file nho hon 1mb";
            }
        }
        if (!flag) {
            setErrors(errorSubmit);
        }
        else {
            const data2 = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                level: 0,
                avatar: avatar
            }
            axios.post('http://localhost:8080/laravel/laravel/public/api/register', data2)
                .then((res) => {
                    // res nay la ket qua API tra ve, co the dung hoac sai, nen log ra xem
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setPost(res.data);
                        alert("thanh cmn cong")
                        console.log(res.data);
                    }
                })
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                < ErrorForm errors={errors} />
                <form encType="multipart/fomr-data" action="#" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                    <input type="text" placeholder="Email Address" name="email" onChange={handleInput} readonly />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    <input type="phone" placeholder="Phone" name="phone" onChange={handleInput} />
                    <input type="address" placeholder="Address" name="address" onChange={handleInput} />
                    <input type="number" placeholder="Level" name="level" onChange={handleInput} />
                    <input type="file" name="avatar" onChange={handleUserInputFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    );
}
export default Register;