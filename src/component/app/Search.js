import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import MainContext from '../../context/MainContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';

const Search = (props) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    const { products } = useContext(MainContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);

    useEffect(() => {
        if (products.length != 0) {
            const filteredClubs = products.filter(Club => {
                let ClubLowercase = (
                    Club.product_name
                ).toLowerCase();
                let searchTermLowercase = searchTerm.toLowerCase();
                return ClubLowercase.indexOf(searchTermLowercase) > -1;
            });
            setSearchedProducts(filteredClubs);
        }
    }, [searchTerm]);

    useEffect(() => {
        setSearchedProducts(products)
    }, [products]);

    return (
        <>
            <section className="pt-5 osahan-main">
                <div className="container">
                    <div class="input-group mt-3 rounded shadow-sm overflow-hidden bg-white">
                        <div class="input-group-prepend">
                            <button class="border-0 btn btn-outline-secondary text-success bg-white"><i class="icofont-search"></i></button>
                        </div>
                        {/* <input type="text" class="shadow-none border-0 form-control pl-0" placeholder="Search for Products.." aria-label="" aria-describedby="basic-addon1" /> */}
                        <input type="text" onChange={e => setSearchTerm(e.target.value)} class="shadow-none border-0 form-control pl-0" id="inlineFormInputGroupUsername2" placeholder="Search for Products.." />
                    </div>
                    <div className="mt-3 bg-white" style={{ position: "fixed", width: "94%", height: "74%", overflowY: "auto", padding: "0px 10px 10px" }}>
                        <div className="row">
                            {searchedProducts.length ?
                                searchedProducts.slice(0, 8).map((product, i) => {
                                    return (
                                        <>
                                            <div className="col-12 p-2">
                                                <Link to={"/" + (product.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + product.id}>
                                                    <div className="row">
                                                        <div className="col-2 d-flex justify-content-center">
                                                            <img style={{ height: 40 }} src={URL + "/images/product-images/" + product.product_image} alt="" />
                                                        </div>
                                                        <div className="col-10 d-flex align-items-center">
                                                            <h5 className='mb-0' style={{ fontSize: 16, color: "#000" }}>{product.product_name} <small>{product.hindi_name}</small></h5>
                                                            <span className='ml-auto' style={{ color: "#000", marginRight: 10 }}>₹{Math.round((product?.price) - (product?.price * product?.discount / 100))}/{product?.product_size + product?.product_unit}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div style={{ width: "95%", margin: "auto", borderBottom: "1px solid #d0d0d0" }}></div>
                                        </>
                                    )
                                }) : <>
                                    <div className="col-12">
                                        <div className="text-center mt-5">
                                            <FcSearch size={36} />
                                            <h6 className='mt-2'>Result not found</h6>
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Search;