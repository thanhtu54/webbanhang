import { useState } from "react";
import StarRatings from 'react-star-ratings';
import ErrorForm from "../Error/ErrorForm";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
function Rate(props) {
    let params = useParams();
    const [errorcheck, setErrorcheck] = useState();
    const [rating, setRating] = useState(0);
    const [data, setData] = useState([]);
    const [test, setTest] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog/detail/' + params.id)
            .then(res => {
                setData(res.data.data)
                // console.log(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    var local = JSON.parse(localStorage.getItem("login"));
    var check = Object.keys(local).length;
    function changeRating(newRating, name) {
        // viet kiem tra login
        if (check == 0) {
            setErrorcheck("xin hay dang nhap")
        }
        setRating(newRating);
        // xong gui qua api
    }
    // console.log(rating)
    if (rating > 0) {
        var rate = rating
    }
    // console.log(local.Auth.id, data.id)
    let url = 'http://localhost:8080/laravel/laravel/public/api/blog/rate/' + data.id
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
    if (rating) {
        const formData = new FormData();
        formData.append('blog_id', data.id);
        formData.append('user_id', local.Auth.id);
        formData.append('rate', rate);
        axios.post(url, formData, config)
            .then((res) => {
                // res nay la ket qua API tra ve, co the dung hoac sai, nen log ra xem
                // console.log(res)
                setTest(res.data.data);
            })
    }
    var tbc = props.avg;
    console.log(tbc)
    return (
        <div>
            <StarRatings
                rating={tbc}
                starHoverColor="yellow"
                changeRating={changeRating}
                numberOfStars={6}
                name='rating'
            />
            <p>{errorcheck}</p>
        </div>
    )
}
export default Rate;