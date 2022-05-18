import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Detail from "./Detail";
import ListComment from "./ListComment";
function Comment(props) {
    const navigate = useNavigate();
    const [cmt, setCmt] = useState("");
    const [errorCmt, setErrorCmt] = useState("");
    const [errorCheck, setErrorCheck] = useState("");
    const [get, setGet] = useState([]);
    const [datacmt, setDatacmt] = useState({}); // ....................
    let params = useParams();
    // console.log(props.getcment);
    var id_cha = props.getcment;
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog/detail/' + params.id)
            .then(res => {
                setGet(res.data.data)
                // console.log(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    var local = JSON.parse(localStorage.getItem("login"));
    const handleCmt = (e) => {
        setCmt(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(cmt)
        if (cmt == "") {
            setErrorCmt("vui long nhap noi dung binh luan")
        }
        else {
            setErrorCmt("")
        }
    }
    const myClick = () => {
        var check = localStorage.getItem("login");
        if (!check) {
            setErrorCheck("xin hay dang nhap")
        }
        else {
            setErrorCheck("")
        }
        // duong dan Api
        let url = 'http://localhost:8080/laravel/laravel/public/api/blog/comment/' + get.id
        let accessToken = local.success.token;
        // config de gui token qua API
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        // kiem tra comment da nhap chua
        if (cmt) {
            const formData = new FormData();
            formData.append('id_blog', get.id);
            formData.append('id_user', local.Auth.id);
            if (!id_cha) {
                formData.append('id_comment', 0);
            }
            else {
                formData.append('id_comment', id_cha)
            }
            formData.append('comment', cmt);
            formData.append('image_user', local.Auth.avatar);
            formData.append('name_user', local.Auth.name);
            axios.post(url, formData, config)
                .then((res) => {
                    props.getComment(res.data.data)
                    // res nay la ket qua API tra ve, co the dung hoac sai, nen log ra xem
                    console.log(res)
                    setDatacmt(res.data.data);
                })
        }
        // navigate('/blog/detail/' + get.id);
    }
    // console.log(props.getComment)
    return (
        <>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <form id="cmt" onSubmit={handleSubmit}>
                                <textarea value={cmt} onChange={handleCmt} name="message" rows={11} />
                                <p>{errorCmt}</p>
                                <p>{errorCheck}</p>
                                <button onClick={myClick} className="btn btn-primary" href>post comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Comment;