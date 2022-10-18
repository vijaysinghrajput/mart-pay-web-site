import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContextData from '../../context/MainContext';
import { Filter } from '../comman/Fillter';
import OshanContainer from '../comman/OshanContainer';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";



const ProductsBySubcategory = (props) => {

    const { subcatID, subcatName } = useParams();
    const data = useContext(ContextData);
    const { products } = data;
    const [isLoading, setIsLoading] = useState(true);
    const [productsBySub, setProductsBySub] = useState([]);
    const [shorting, setShorting] = useState({});

    useEffect(() => {
        // window.scrollTo(0, 0)
        setProductsBySub(products.filter(p => p.category_id == subcatID));
        setIsLoading(false);
    }, [products, subcatID]);

    const setShortingByClick = (shorting) => {
        const myProd = products.filter(p => p.category_id == subcatID);
        const { priceLTH, priceHTL, discount } = shorting;
        priceLTH ? setProductsBySub(myProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
            : priceHTL ? setProductsBySub(myProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)))
                : discount ? setProductsBySub(myProd.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)))
                    : setProductsBySub(products.filter(p => p.category_id == subcatID))
    }

    return (
        <>
            <Seo
                title={subcatName + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={subcatName + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={null}
            />

            <OshanContainer>
                <div class="d-flex align-items-center mb-3">
                    <h4>{subcatName}</h4>
                    <div class="m-0 text-center ml-auto">
                        <a href="#" data-toggle="modal" data-target="#exampleModal"
                            class="btn text-muted bg-white mr-2"><i class="icofont-filter mr-1"></i> Filter</a>
                    </div>
                </div>
                <div class="row">
                    {
                        productsBySub.map((data, i) => {
                            return (
                                <BasicVegitableFruit data={data} />
                            )
                        })
                    }
                </div>
                <Filter setShortingMain={setShortingByClick} />
            </OshanContainer>
        </>
    )


}

export default ProductsBySubcategory;