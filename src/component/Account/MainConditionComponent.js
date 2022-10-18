import React, { useContext, useEffect, useState } from 'react';
import MainData from '../../context/MainContext';
import AccountContainer from '../comman/AccountContainer';

import AccountNavigatinMenu from './AccountNavigatinMenu'

import Terms from './Terms'




import { useLocation } from 'react-router-dom'





const MainConditionComponent = (props) => {

    const data = useContext(MainData);
    const condition = data.condition[0];
    const Storefaq = data.Storefaq;

    // console.log('faq', faq)

    const location = useLocation();


    return (
        <>



            <AccountContainer>
                <AccountNavigatinMenu />





                {location.pathname == '/about' ? <Terms conditionTitel="About" conditionData={condition.about} /> : null}
                {location.pathname == '/term-and-condition' ? <Terms conditionTitel="Term & Condition" conditionData={condition.terms} /> : null}
                {location.pathname == '/privacy-and-policy' ? <Terms conditionTitel="Privacy & Policy" conditionData={condition.privacy} /> : null}
                {location.pathname == '/shipping-policy' ? <Terms conditionTitel="Shipping Policy" conditionData={condition.shiiping} /> : null}
                {location.pathname == '/return-and-refund-policy' ? <Terms conditionTitel="Return & Refund Policy" conditionData={condition.returns} /> : null}
                {location.pathname == '/faq' ? <Terms conditionTitel="FAQ" conditionData={Storefaq} /> : null}


            </AccountContainer>





        </>
    )

}

export default MainConditionComponent;