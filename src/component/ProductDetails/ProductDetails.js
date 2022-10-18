import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";


const ProductDetails = () => {

    const { prodID } = useParams();
    const data = useContext(MainContext);
    const { products, addToCart, removeFromCart, cartItems } = data;
    const [moreLikeThis, setMoreLikeThis] = useState([]);
    const [product, setProduct] = useState();

    useEffect(() => {
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [prodID]);

    useEffect(() => {
        const more = products.filter(e => e?.category_id === product?.category_id)
        setMoreLikeThis(more);
    }, [product])

    useEffect(() => {
        const getData = products.find(e => e.id === prodID);
        const isAvilable = cartItems.find(o => o.id === prodID);
        isAvilable ? setProduct({
            ...getData,
            itemQuant: isAvilable.itemQuant
        }) : setProduct({
            ...getData,
            itemQuant: 0
        })
    }, [products, cartItems, data, prodID]);

    return (
        <>

            <Seo
                title={product?.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={product?.product_name + " delivery in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={URL + "/images/product-images/" + product?.product_image}
            />

            {console.log("about product", product)}
            <section className="pb-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex mb-3">
                                <img src={URL + "/images/product-images/" + product?.product_image} className="img-fluid mx-auto shadow-sm rounded"
                                    alt={product?.product_name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                    title={product?.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-4 bg-white rounded shadow-sm">
                                <div className="pt-0">
                                    <h2 className="font-weight-bold">{product?.product_name} <h3>{product?.hindi_name}</h3></h2>
                                    <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                        Product MRP : <b className="h6 text-dark mb-0" style={{ fontSize: 18, marginLeft: 5 }}>₹{Math.round((product?.price) - (product?.price * product?.discount / 100))} {product?.discount != 0 && <span style={{ textDecoration: "line-through", fontSize: 16 }}>({product?.price})</span>}</b>
                                        {product?.discount != "" || product?.discount != "0" && <span className="badge badge-danger ml-2">{product?.discount}%</span>}
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="font-weight-bold m-0">Available in:</p>
                                            <p className="text-muted m-0">{product?.product_size + product?.product_unit}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="pt-3 bg-white">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                {!product?.itemQuant ? (
                                                    <div>
                                                        <a href="javascript:void(0)" onClick={() =>
                                                            addToCart({
                                                                ...product,
                                                                itemQuant: 1,
                                                                cartId: product?.id
                                                            })
                                                        } className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2" /> ADD TO CART</a>

                                                    </div>
                                                ) : (
                                                    <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 120, padding: 16 }}>
                                                        {product?.itemQuant === 1 ? (
                                                            <MdDelete
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#c23838" }}
                                                                onClick={() =>
                                                                    removeFromCart(product?.id)}
                                                            />
                                                        ) : (
                                                            <AiOutlineMinus
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                                onClick={() => addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant - 1,
                                                                    price: product?.price - product?.price,
                                                                    cartId: product?.id
                                                                })}
                                                            />
                                                        )}
                                                        <h5 className="mb-0" style={{ fontSize: 20 }}>{product?.itemQuant}</h5>
                                                        <AiOutlinePlus
                                                            style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                            onClick={() =>
                                                                addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant + 1,
                                                                    price: parseInt(product?.price) + parseInt(product?.price),
                                                                    cartId: product?.id
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <p className="font-weight-bold my-2">Product Details</p>
                                        <p className="text-muted small mb-0">{product?.products_description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-3 mb-3">Maybe You Like this.</h5>
                    <div className="row">
                        {moreLikeThis.slice(0, 8).map((data) => {
                            return data.id !== prodID && <BasicVegitableFruit data={data} />
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;