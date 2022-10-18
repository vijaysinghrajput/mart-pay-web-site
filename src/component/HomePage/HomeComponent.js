import React from 'react';
import Category from './Category';
import OshanContainer from '../comman/OshanContainer';
import Promo from './Promo';
import TodayPicks from './TodayPicks';

import Seo from '../Seo'
import { SeoData } from '../../URL';

const HomeComponent = (props) => {
    

    return (
        <>



        


            <OshanContainer >

                <Category />

                {/* <Promo /> */}

                <TodayPicks />

            </OshanContainer>
        </>
    )

}

export default HomeComponent;