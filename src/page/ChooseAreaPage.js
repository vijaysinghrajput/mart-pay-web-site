import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import ChooseArea from '../component/comman/ChooseArea';
import ContextData from '../context/MainContext';
import Cookies from 'universal-cookie';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useMediaQuery } from '@chakra-ui/react';

const cookies = new Cookies();

const ChooseAreaPage = (props) => {

    const data = useContext(ContextData);
    const [toggle, setToggle] = useState(true);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    // const navigate = useNavigate();

    // console.log()

    if (data.auth.isUserLogin || cookies.get("isUserLogin")) {
        return <Navigate to="/" />
    } else {
        return (
            <>
                {!isNotSmallerScreen && <Header />}
                <ChooseArea toggle={toggle} setToggle={setToggle} />
                {/* <Footer /> */}
            </>
        )
    }

}

export default ChooseAreaPage;