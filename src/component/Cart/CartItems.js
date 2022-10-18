import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { CartItemsCard } from '../ProductsCards/CartItems';

const CartItems = (props) => {

    const data = useContext(MainContext);
    const { cartItems, auth, products } = data;
    const navigation = useNavigate();
    const location = useLocation();
    const GetTotal = cartItems.reduce(function (a, b) {
        const price = Math.round(((b.price) - ((b.price) * (b.discount / 100))) * b.itemQuant)
        return a + Number(price);
    }, 0);

    useEffect(() => {
        data.cartItems.length === 0 && navigation("/");
    }, [data]);

    return (
        <>
            <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden">
                <div className="card-header bg-white border-0 p-0" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <span className="c-number">1</span> Cart ({data.cartItems.length} items)
                        </button>
                    </h2>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body p-0 border-top">
                        <div className="osahan-cart">
                            {cartItems.map((data, i) => {
                                const outOfStock = products.find(o => o.id == data.id);
                                return (
                                    <CartItemsCard data={data} outOfStock={outOfStock} />
                                )
                            })}
                            <div>
                                {auth.isUserLogin ?
                                    <a href="#" className="text-decoration-none btn btn-block p-3" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                        <div className="rounded shadow bg-success d-flex align-items-center p-3 text-white">
                                            <div className="more">
                                                <h6 className="m-0">Subtotal ₹{Math.round(GetTotal)}</h6>
                                                <p className="small m-0">Proceed to checkout</p>
                                            </div>
                                            <div className="ml-auto"><i className="icofont-simple-right" /></div>
                                        </div>
                                    </a> : <Link to="/login" state={location.pathname} className="text-decoration-none btn btn-block p-3">
                                        <div className="rounded shadow bg-danger d-flex align-items-center p-4 text-white">
                                            <div className="more">
                                                <h6 className="m-0">Please Login First</h6>
                                            </div>
                                            <div className="ml-auto"><i className="icofont-simple-right" /></div>
                                        </div>
                                    </Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CartItems;