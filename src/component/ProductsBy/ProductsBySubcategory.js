import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContextData from '../../context/MainContext';
import { Filter } from '../comman/Fillter';
import OshanContainer from '../comman/OshanContainer';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";



const ProductsBySubcategory = (props) => {

    const { storeProductsData, storeCategoryRelode,delivery_city,website_name} = useContext(ContextData);

    const { subcatID, subcatName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [storeProductsDataBySub, setstoreProductsDataBySub] = useState([]);
    const [shorting, setShorting] = useState({});

    useEffect(() => {
        // window.scrollTo(0, 0)
        setstoreProductsDataBySub(storeProductsData.filter(p => p.parent_category_id == subcatID));
        setIsLoading(false);
    }, [storeProductsData, subcatID]);

    const setShortingByClick = (shorting) => {
        const myProd = storeProductsData.filter(p => p.parent_category_id == subcatID);
        const { priceLTH, priceHTL, discount } = shorting;
        priceLTH ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
            : priceHTL ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)))
                : discount ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)))
                    : setstoreProductsDataBySub(storeProductsData.filter(p => p.parent_category_id == subcatID))
    }

    return (
        <>
            <Seo
                title={subcatName + " Home Delivery in "+(delivery_city)+" | "+(website_name)}
                descreption={subcatName + " Home Delivery in "+(delivery_city)+" | "+(website_name)+" is an online grocery delivery website and app in "+(delivery_city)}
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
                        storeProductsDataBySub.map((data, i) => {
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