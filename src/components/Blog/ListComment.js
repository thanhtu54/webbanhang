import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Diamond from './456.jpg';
import Detail from './Detail';
function ListComment(props) {
    let params = useParams();
    const [data, setData] = useState();
    // const [check, setCheck] = useState();
    // console.log(id_comment)
    // const getcomment = props.getcmt;
    function Show() {
        var list = props.useCmt;
        // console.log(list)
        // console.log(list) {
        var check;
        return list.map((value, key) => {
            var img = value.image_user;
            var name = value.name_user;
            var date = value.updated_at;
            var cmt = value.comment;
            const myArray = date.split(" ");

            check = value.id;
            function myClick() {
                props.get_id(value.id);
            }
            if (value.id_comment == 0) {
                return (
                    <>
                        <li className="media">
                            <a className="pull-left" href="#">
                                <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + img} />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{name}</li>
                                    <li><i className="fa fa-clock-o" />{myArray[1]}</li>
                                    <li><i className="fa fa-calendar" />{myArray[0]}</li>
                                </ul>
                                <p>{cmt}</p>
                                <a onClick={myClick} className="btn btn-primary" href="#cmt"><i className="fa fa-reply" />Replay</a>
                            </div>
                        </li>
                        {rep(check)}
                    </>
                )
            }
            function rep(check) {
                return list.map((value, key) => {
                    var img = value.image_user;
                    var name = value.name_user;
                    var date = value.updated_at;
                    var cmt = value.comment;
                    const myArray = date.split(" ");
                    if (value.id_comment == check) {
                        return (
                            <li className="media second-media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={"http://localhost:8080/laravel/laravel/public/upload/user/avatar/" + img} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{name}</li>
                                        <li><i className="fa fa-clock-o" />{myArray[1]}</li>
                                        <li><i className="fa fa-calendar" />{myArray[0]}</li>
                                    </ul>
                                    <p>{cmt}</p>
                                    <a className="btn btn-primary" href="#cmt"><i className="fa fa-reply" />Replay</a>
                                </div>
                            </li>
                        )
                    }
                }
                )
            }
        }
        )
    }

    // config de gui token qua API

    return (
        <>
            <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ul className="media-list">
                    {Show()}
                    {/* {Replay()} */}
                </ul>
            </div>

        </>
    )
}
export default ListComment;