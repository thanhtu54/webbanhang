import axios from "axios";
import { useEffect, useState } from "react";
import ErrorForm from "../Error/ErrorForm";
function Update(props) {
    const [inputs, setInputs] = useState('');
    const [avatar, setAvatar] = useState();
    const [getfile, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});
    useEffect(() => {
        var local = JSON.parse(localStorage.getItem("login"));
        console.log(local.Auth);
        setInputs({
            token: local.success.token,
            name: local.Auth.phone,
            password: local.Auth.password,
            email: local.Auth.email,
            address: local.Auth.address,
            phone: local.Auth.phone,
            level: local.Auth.level,
            avatar: local.Auth.avatar,
            id: local.Auth.id
        })

    }, [])

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: value }))
    }
    // setInputs = {
    //     EMAIL: ...,
    //     pass:...
    // }

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
            let url = 'http://localhost:8080/laravel/laravel/public/api/user/update/' + inputs.id;
            let accessToken = inputs.token;
            // config de gui token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            // kiem tra comment da nhap chua
            if (inputs) {
                const formData = new FormData();
                formData.append('name', inputs.name);
                formData.append('email', inputs.email);
                formData.append('password', inputs.password);
                formData.append('phone', inputs.phone);
                formData.append('address', inputs.address);
                formData.append('level', inputs.level);
                formData.append('avatar', inputs.avatar);
                axios.post(url, formData, config)
                    .then((res) => {
                        // res nay la ket qua API tra ve, co the dung hoac sai, nen log ra xem
                        console.log(res)
                        alert("thanh cong")
                        setData(res.data.data);
                    })
            }
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>User Update!</h2>
                < ErrorForm errors={errors} />
                <form encType="multipart/fomr-data" action="#" onSubmit={handleSubmit}>
                    <input type="text" value={inputs.name} placeholder="Name" name="name" onChange={handleInput} />
                    <input type="text" value={inputs.email} placeholder="Email Address" name="email" readonly />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    <input type="phone" value={inputs.phone} placeholder="Phone" name="phone" onChange={handleInput} />
                    <input type="address" value={inputs.address} placeholder="Address" name="address" onChange={handleInput} />
                    <input type="number" value={inputs.level} placeholder="Level" name="level" onChange={handleInput} />
                    <input type="file" name="avatar" onChange={handleUserInputFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    )
}
export default Update;