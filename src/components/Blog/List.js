import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
function Index(props) {
    const [data, setData] = useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/blog")
            .then(res => {
                setData(res.data.blog.data)
                // console.log(res.data.blog.data)
            })
            .catch(error => console.log(error))
    }, [])
    function fetchData() {
        return data.map((value, key) => {
            let text = value.created_at;
            const myArray = text.split(" ");
            return (
                <div className="single-blog-post">
                    <h3>{value.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" />Mac Doe</li>
                            <li><i className="fa fa-clock-o" />{myArray[1]}</li>
                            <li><i className="fa fa-calendar" />{myArray[0]}</li>
                        </ul>
                        <span>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                        </span>
                    </div>
                    <a href>
                        <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + value.image} alt="" />
                    </a>
                    <p>{value.description}</p>
                    <Link to={"/blog/detail/" + value.id} className="btn btn-primary">Read More</Link>
                </div>
            )
        }
        )
    }
    return (
        <div className="col-sm-9">
            < div className="blog-post-area" >
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
            </div >
        </div >
    );

}
export default Index;