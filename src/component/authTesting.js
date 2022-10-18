import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import { PostData } from '../../services/PostData';
// import { Redirect } from 'react-router-dom';
// import './Welcome.css';
URL = 'https://superg.in/admin';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false,
            name: '',
            provider: '',
            email: '',
            provider_id: '',
            token: '',
            provider_pic: '',

        };
        this.signup = this.signup.bind(this);
    }

    signup(res, type) {



        if (type === 'facebook' && res.email) {



            this.setState({
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url

            })


            this.insertUserFun()

        }

        if (type === 'google' && res.profileObj.name) {

            this.setState({
                name: res.profileObj.name,
                provider: type,
                email: res.profileObj.email,
                provider_id: res.profileObj.googleId,
                token: res.tokenId,
                provider_pic: res.profileObj.imageUrl
            })


            this.insertUserFun()


        }


    }



    insertUserFun() {

        // console.log('innn')
        fetch(URL + "/APP-API/App/InsertUser", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({


                name: this.state.name,
                provider: this.state.provider,
                email: this.state.email,
                provider_id: this.state.provider_id,
                token: this.state.token,
                provider_pic: this.state.provider_pic,

            })


        }).then((response) => response.json())
            .then((responseJson) => {



                // console.log('backend', responseJson)



            })
            .catch((error) => {
                //  console.error(error);

            });
    }



    render() {



        const responseFacebook = (response) => {
            // console.log(response);
            this.signup(response, 'facebook');
        }

        const responseGoogle = (response) => {
            // console.log(response);
            this.signup(response, 'google');
        }

        return (

            <div className="row body">
                <div className="medium-12 columns">
                    <div className="medium-12 columns">
                        <h2 id="welcomeText"></h2>

                        <FacebookLogin
                            appId="4575091129250508"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            onFailure={responseFacebook}


                        />
                        <br /><br />

                        <GoogleLogin
                            clientId="881608281055-5fc0eukrd0q1qul9odqdaftnscognlr3.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle} />

                    </div>
                </div>
            </div>
        );
    }
}
export default App;