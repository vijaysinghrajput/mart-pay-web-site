import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

import '../css/NotFound.css';

const NotFoundPage = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="osahan-main-body" style={{ padding: "8rem 1rem" }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 align-self-center">
                            <h1>404</h1>
                            <h2>UH OH! You're lost.</h2>
                            <p>The page you are looking for does not exist.
                                How you got here is a mystery. But you can click the button below
                                to go back to the homepage.
                            </p>
                            <button onClick={() => navigate("/")} class="btnPNF green">HOME</button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )

}

export default NotFoundPage;