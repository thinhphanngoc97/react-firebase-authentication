import React, { Component } from 'react';
import './App.scss';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSignUp = (event) => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function () {
                alert("Sign up successfully!");
            })
            .catch(function (error) {
                alert(error.message);
            });

        event.preventDefault();
    }

    handleSignIn = (event) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function (error) {
            alert(error.message);
        });

        event.preventDefault();
    }

    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
            signInWithFacebook,
        } = this.props;

        return (
            <div className="App">
                <div className="header">
                    <div className="header-user-info">
                        {
                            user
                            &&
                            <div>
                                <div>
                                    <img src={user.photoURL} alt="" />
                                </div>
                                <p>{user.displayName}</p>
                            </div>
                        }
                    </div>
                    <div className="header-user-option">
                        <div className="dropdown">
                            <button
                                className="btn dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-chevron-down"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                {
                                    user
                                        ? <button onClick={signOut}>Sign out</button>
                                        :
                                        <div>
                                            <button data-toggle="modal" data-target="#signInModal">Sign in</button>
                                            <button data-toggle="modal" data-target="#signUpModal">Sign up</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sign-up-modal modal fade" id="signUpModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form className="sign-up-form">
                                <label>Email</label>
                                <input onChange={this.handleChangeEmail} type="email" name="email" />
                                <label>Password </label>
                                <input onChange={this.handleChangePassword} type="password" name="password" />
                                <button onClick={this.handleSignUp}>Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="sign-in-modal modal fade" id="signInModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form className="sign-in-form">
                                <label>Email</label>
                                <input onChange={this.handleChangeEmail} type="email" name="email" />
                                <label>Password </label>
                                <input onChange={this.handleChangePassword} type="password" name="password" />
                                <button onClick={this.handleSignIn}>Sign in</button>
                            </form>
                            <button className="btn-facebook" onClick={signInWithFacebook}>
                                <i className="fa fa-facebook fa-fw"></i> Sign in with Facebook
                            </button>
                            <button className="btn-google" onClick={signInWithGoogle}>
                                <i className="fa fa-google fa-fw"></i> Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);
