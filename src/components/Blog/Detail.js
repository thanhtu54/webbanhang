import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ListComment from './ListComment';
import Comment from './Comment';
import Rate from './Rate';
function Detail(props) {
    // const getCmt = props.getcmt;
    // - tao dc trang blog/detail 
    // - lay id ra 
    // console.log(getComment)
    let params = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState([]);
    const [id, setId] = useState();
    const [rate, setRate] = useState({});
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog/detail/' + params.id)
            .then(res => {
                setData(res.data.data)
                setShow(res.data.data.comment)
                // console.log(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    function fetchData() {
        return (
            <div className="single-blog-post">
                <h3>{data.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" />1:35pm</li>
                        <li><i className="fa fa-calendar" />25/12/2020</li>
                    </ul>
                    {/* <span>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star-half-o"></i>
                          </span> */}
                </div>
                <a href>
                    <img src={"http://localhost:8080/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
                </a>
                <p>{data.title}</p>
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        )
    }
    function getComment(getcmt) {
        const children = show.concat(getcmt);
        setShow(children)
        // console.log(getcmt)
    }
    // console.log(show);
    function getId(getid) {
        setId(getid)
    }
    // console.log(data.id)
    useEffect(() => {
        axios.get('http://localhost:8080/laravel/laravel/public/api/blog/rate/' + params.id)
            .then(res => {
                setRate(res.data.data)
                // console.log(res)
            })
            .catch(error => console.log(error))
    }, [])
    if (Object.keys(rate).length > 0) {
        var sum = 0;
        let avg = rate.map((value) => {
            sum += value.rate
        })
        let tbc = avg.length;
        var abc = sum / tbc;
        console.log(abc)
    }
    return (
        <>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {fetchData()}
                </div>
                <div className="socials-share">
                    <a href><img src="images/blog/socials.png" alt="" /></a>
                </div>{/*/socials-share*/}
                <Rate avg={abc} />
                {show.length !== 0 && (
                    <ListComment useCmt={show} get_id={getId} />
                )}
                <Comment getComment={getComment} getcment={id} />
            </div>
        </>
    );
}
export default Detail; 