import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import ContextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = () => {

    const data = useContext(ContextData);
    const navigate = useNavigate();
    const location = useLocation();
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const [userMobileNumber, setUserMobileNumber] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const phoneno = /^\d{10}$/;
        userMobileNumber.match(phoneno) ? setIsPhoneValid(false) : setIsPhoneValid(true);
    }, [userMobileNumber]);

    const sendOTP = () => {
        setLoading(true);
        fetch(URL + "/APP-API/App/sendOtp", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                mobile: userMobileNumber,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                navigate("/verification", { state: { OTP: responseJson.otp, userMobileNumber, lastPage: location.state } });
            })
            .catch((error) => {
                //  console.error(error);
            });
    }

    const responseGoogle = (res) => {
        const userData = {
            name: res.profileObj.name,
            provider: "google",
            email: res.profileObj.email,
            provider_id: res.profileObj.googleId,
            token: res.tokenId,
            provider_pic: res.profileObj.imageUrl,
            login_source: 'Website'
        };
        insertUserFun(userData);
    }

    const responseFacebook = (res) => {
        const userData = {
            name: res.name,
            provider: 'facebook',
            email: res.email,
            provider_id: res.id,
            token: res.accessToken,
            provider_pic: res.picture.data.url,
            login_source: 'Website'

        };
        insertUserFun(userData);
    }

    const insertUserFun = (userObject) => {
        fetch(URL + "/APP-API/App/InsertUser", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userObject)
        }).then((response) => response.json())
            .then((responseJson) => {
                cookies.set('isUserLogin', true, { maxAge: 9999999999 });
                cookies.set('userID', (responseJson.data[0].id), { maxAge: 9999999999 });
                cookies.set('userProvider_id', (responseJson.data[0].provider_id), { maxAge: 9999999999 });
                cookies.set('userName', (responseJson.data[0].name), { maxAge: 9999999999 });
                cookies.set('userMobile', (responseJson.data[0].mobile), { maxAge: 9999999999 });
                data.setUserLogin({ user_info: responseJson.data[0] });
                location.state ? navigate(location.state) : navigate("/");
            })
            .catch((error) => {
                //  console.error(error);
            });
    }

    return (
        <>
            <section class="osahan-signin-main" style={{ overflowX: "hidden" }}>
                <div class="container containerLogin">
                    <div class="row d-flex align-items-center justify-content-center vh-100">
                        <div class="col-lg-6">
                            {isNotSmallerScreen && <div className="div">
                                <Link to="/" class="text-decoration-none text-dark d-flex align-items-center justify-content-center mb-5">
                                    <img class="osahan-logo mr-2" src="/img/logo.svg" />
                                    <h4 class="font-weight-bold text-success m-0">SuperG.in</h4>
                                </Link>
                            </div>}
                            <div class="osahan-signin shadow-sm bg-white p-4 rounded vh-sm-100">
                                <div class="p-3">
                                    <h2 class="my-0">Welcome Back</h2>
                                    <p class="small mb-4">Sign in to Continue.</p>
                                    <div class="form-group">
                                        <label>Mobile Number</label>
                                        <input placeholder="Your Mobile Number" type="tel" class="form-control" maxlength={10}
                                            onChange={e => setUserMobileNumber(e.target.value)} onKeyDown={e => e.key === "Enter" && sendOTP()} />
                                    </div>
                                    {isLoading ? (
                                        <Button
                                            isLoading
                                            loadingText='Sending OTP'
                                            class="btn btn-success btn-lg rounded d-flex align-items-center justify-content-center w-100"
                                            variant='outline'
                                        />
                                    ) : (
                                        <button type="button" disabled={isPhoneValid} onClick={() => sendOTP()} class="btn btn-success btn-lg rounded btn-block">Send Otp</button>
                                    )}
                                    {/* <p class="text-muted text-center small m-0 py-3">or</p>
                                    <FacebookLogin
                                        appId="852885668724754"

                                        cssClass="btn btn-primary btn-block rounded btn-lg btn-apple mb-2"
                                        icon="icofont-facebook mr-3"

                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        onFailure={responseFacebook}
                                    />
                                    <GoogleLogin
                                        clientId="881608281055-5fc0eukrd0q1qul9odqdaftnscognlr3.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        render={renderProps => (
                                            <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}
                                                class="btn btn-light border btn-block rounded btn-lg btn-google">
                                                <i class="icofont-google-plus text-danger mr-2"></i> Sign up with Google
                                            </a>
                                        )}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Login;