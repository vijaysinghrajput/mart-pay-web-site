import React from 'react';

import { useLocation } from 'react-router-dom'

import Seo from '../Seo'

const Terms = ({ conditionTitel, conditionData }) => {
    const location = useLocation();

    return (
        <>

            <Seo
                title={conditionTitel + "| SuperG.in | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={conditionTitel + " | SuperG.in | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={null}

            />


            <React.Fragment>
                {location.pathname == '/faq' ?

                    (
                        <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                            <h4 class="mb-4 profile-title"> {conditionTitel} </h4>
                            <div id="basics">

                                <div id="basicsAccordion">





                                    {conditionData.length ? (

                                        <>
                                            {conditionData.map((item, i) => {
                                                return (
                                                    <div class="box border rounded mb-1 bg-white">
                                                        <div id={"ABC" + i}>
                                                            <h5 class="mb-0">
                                                                <button class="shadow-none btn btn-block d-flex align-items-center justify-content-between card-btn p-3 collapsed" data-toggle="collapse" data-target={"#col" + i} aria-expanded="false" aria-controls="basicsCollapseOne">
                                                                    {item.question}
                                                                    <i class="icofont-simple-down"></i>
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id={"col" + i} class="collapse " aria-labelledby={"ABC" + i} data-parent="#basicsAccordion" >
                                                            <div class="card-body border-top p-3 text-muted">
                                                                {item.answer}
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </>


                                    ) : null}


                                </div>

                            </div>
                        </div>
                    ) :

                    (
                        <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                            <h4 class="mb-4 profile-title">{conditionTitel}</h4>
                            <div id="terms_conditions">
                                <p class="text-muted">{conditionData}</p>
                            </div>
                        </div>
                    )

                }
            </React.Fragment>

        </>
    )

}

export default Terms;