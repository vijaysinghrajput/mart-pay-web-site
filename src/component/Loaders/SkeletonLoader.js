import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMediaQuery } from '@chakra-ui/react';
import 'react-loading-skeleton/dist/skeleton.css';

export const CategoryLoading = (props) => {
    return (
        <div class="col-6 col-md-3 mb-3">
            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                <div class="p-4">
                    <SkeletonTheme baseColor="#ebebeb" highlightColor="#fafafa">
                        <p className='mb-1'>
                            <Skeleton height={130} width={218} />
                        </p>
                    </SkeletonTheme>
                </div>
            </div>
        </div>
    )
}

export const PromoLoading = (props) => {
    return (
        <div className='row'>
            <div class="col-4 col-md-4 mb-3">
                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                    <div class="p-1">
                        <SkeletonTheme baseColor="#ebebeb" highlightColor="#fafafa">
                            <p className='mb-1'>
                                <Skeleton height={160} />
                            </p>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
            <div class="col-4 col-md-4 mb-3">
                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                    <div class="p-1">
                        <SkeletonTheme baseColor="#ebebeb" highlightColor="#fafafa">
                            <p className='mb-1'>
                                <Skeleton height={160} />
                            </p>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
            <div class="col-4 col-md-4 mb-3">
                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                    <div class="p-1">
                        <SkeletonTheme baseColor="#ebebeb" highlightColor="#fafafa">
                            <p className='mb-1'>
                                <Skeleton height={160} />
                            </p>
                        </SkeletonTheme>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductLoading = (props) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    return (
        <div class="col-6 col-md-3 mb-3">
            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                <div class="p-4">
                    <SkeletonTheme baseColor="#ebebeb" highlightColor="#fafafa">
                        <p className='mb-2'>
                            <Skeleton height={isNotSmallerScreen ? 200 : 80} />
                        </p>
                        <p className='mb-0'>
                            <Skeleton />
                        </p>
                    </SkeletonTheme>
                </div>
            </div>
        </div>
    )
}