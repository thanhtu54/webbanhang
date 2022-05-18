import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
function Show(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/laravel/laravel/public/api/product")
            .then(res => {
                setData(res.data.data)
                console.log(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(data)
    function List() {
        return data.map((value) => {
            var id = value.id;
            var img = value.image;
            var price = value.price;
            var name = value.name;
            console.log(img)
            return (
                <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img src={"http://localhost:8080/laravel/laravel/public/upload/user/Product/2/" + img} alt="" />
                                <h2>{price}</h2>
                                <p>{name}</p>
                                <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                            </div>
                            <div className="product-overlay">
                                <div className="overlay-content" id={1}>
                                    <h2>{price}</h2>
                                    <p>{name}</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })
    }
    function List2() {
        return data.map((value) => {
            var id = value.id;
            var img = value.image;
            var price = value.price;
            var name = value.name;
            return (
                < div className="tab-content" >
                    <div className="tab-pane fade active in" id="tshirt">
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>{price}</h2>
                                        <p>{name}</p>
                                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
        })
    }
    function List3() {
        return data.map((value) => {
            var id = value.id;
            var img = value.image;
            var price = value.price;
            var name = value.name;
            return (
                <div class="col-sm-4">
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <img src="images/home/recommend1.jpg" alt="" />
                                <h2>{price}</h2>
                                <p>{name}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i
                                    class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                    <h2 className="title text-center">Features Items</h2>
                    {List()}
                </div>{/*features_items*/}
                <div className="category-tab">{/*category-tab*/}
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                            <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                            <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                            <li><a href="#kids" data-toggle="tab">Kids</a></li>
                            <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                        </ul>
                    </div>
                    {List2()}
                </div>{/*/category-tab*/}
                <div className="recommended_items">{/*recommended_items*/}
                    <h2 className="title text-center">recommended items</h2>
                    <div class="item active">
                        {List3()}
                    </div>
                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                        <i className="fa fa-angle-left" />
                    </a>
                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                        <i className="fa fa-angle-right" />
                    </a>
                </div>{/*/recommended_items*/}
            </div>
        </>
    )
}
export default Show;