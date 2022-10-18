import React, { useContext } from 'react';
import { useState } from 'react';
import ContextData from '../../context/MainContext';
import { ProductLoading } from '../Loaders/SkeletonLoader';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from 'react';

const TodayPicks = (props) => {
    const { storeProductsData, storeCategoryRelode,delivery_city,website_name} = useContext(ContextData);

    const data = useContext(ContextData);
    const [limit, setLimit] = useState(8);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        // a fake async api call like which sends...
        // few more records in .5 secs ayse hi bnaye hain...
        setTimeout(() => {
            setLimit(limit + 4);
        }, 700);
    };

    useEffect(() => {
        if (limit === 20) {
            setHasMore(false);
        }
    }, [limit])

    return (
        <>
            <div class="title d-flex align-items-center py-3">
                <h5 class="m-0">Pick's Today</h5>
            </div>

            <div class="pick_today">
                <InfiniteScroll
                    dataLength={limit}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    style={{ overflow: 'hidden' }}
                    loader={<>
                        <div className="row">
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                        </div>
                    </>}
                    scrollThreshold={0.9}
                >
                    <div class="row">
                        {data.isLoading ? <>
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                            <ProductLoading />
                        </>
                            :

                            storeProductsData.slice(0, limit).map((data, i) => {
                                return (
                                    <BasicVegitableFruit data={data} />
                                )
                            })}


                    </div>
                </InfiniteScroll>
                {/* <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center mt-4">
                        <a href="javascript:void(0)" onClick={() => setLimit(limit + 8)} class="mx-auto btn btn-outline-success btn-sm">See more</a>
                    </div>
                </div> */}
            </div>
        </>
    )

}

export default TodayPicks;