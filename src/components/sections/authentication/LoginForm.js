import React, {useState} from "react";
import {Link} from "react-router-dom";
import {EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX} from '../../../constants/regex'
import {convStrToSHA256} from "../../../utils/HashConverter";
import {FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE} from "../../../constants/page_routes";
import {VERIFY_USER_API} from "../../../constants/api_routes";
import {SERVER_URL} from "../../../config/config";
import {setTokenInCookie} from "../../../utils/Token";

export function LoginForm() {
    const [state, setState] = useState({
        email: "",
        password: "",
        forgotPassword: false,
        forgotEmail: "",
        errors: {
            email: "",
            password: "",
        },
        isLoading: false,
        errorMsg: null
    });

    const handleChange = (event) => {
        if(state.errorMsg !== null) {
            setState({...state, errorMsg: null})
        }

        //handling input of user
        const {name, value} = event.target;
        let errors = state.errors;
        switch (name) {
            case "email":
                errors.email = EMAIL_VALIDATION_REGEX.test(value) ? "" : "Email is not valid!";
                break;
            case "password":
                errors.password =
                    value.length < 1
                        ? "Password is required!"
                        : PASSWORD_VALIDATION_REGEX.test(value) ? "" :
                        "Password must contain at least 8 characters, 1 number, 1 lowercase, 1 uppercase, 1 special character (!@#$%^&*)!";
                break;
            default:
                break;
        }
        setState({...state, errors, [name]: value});
    };

    const handleSubmit = async (event) => {
        //this function is called when the user submits the form
        setState({...state, isLoading: true, errorMsg: null})
        event.preventDefault();
        await SERVER_URL.post(VERIFY_USER_API, {
            email: state.email,
            password: convStrToSHA256(state.password), //hashed password
        })
            .then(res => {
                setState({...state, isLoading: true, errorMsg: null})
                if (res.data.hasOwnProperty("token")) {
                    setTokenInCookie(res.data.token)
                }
            })
            .catch((error) => {
                setState({...state, isLoading: false, errorMsg: error.response.data.errorMessage})
            });
    };

    return (

        <div style={{maxWidth: "400px", marginTop: "5vh"}}
             className="container col-12 col-md-4 d-flex  justify-content-center">
            <div className="card-body transparent-bg">
                <div className="row">
                    <div className="col-md-12 text-center ">
                        <h2>Log In</h2>
                    </div>

                    <div style={{textAlign: "center"}} className="col-md-12">
                        <h6>Join Us Today</h6>
                        <p>
                            <small className="text-white">
                                Please fill in the information to Login into your account.
                            </small>
                        </p>
                    </div>

                    <div className="col-md-12">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="email"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="*Email"
                                        required
                                    />
                                    {state.errors.email.length > 0 && (
                                        <div className="alert alert-danger instant-validation-msg" role="alert">
                                            {state.errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="*Password"
                                        required
                                    />
                                    {state.errors.password.length > 0 && (
                                        <div className="alert alert-danger instant-validation-msg" role="alert">
                                            {state.errors.password}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label
                                        onClick={() => {
                                            setState({...state, forgotPassword: true});
                                        }}
                                        style={{
                                            marginLeft: "0.3vw",
                                            fontSize: "0.8em",
                                        }}
                                        className="form-check-label">
                                        <b style={{color: "white"}}>Forgot Password? </b>
                                        <Link to={FORGOT_PASSWORD_ROUTE} className="orange-label">
                                            <b>Click Here</b>
                                        </Link>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-11 ml-3 pl-1 text-danger bg-light">
                                    <b>{state.errorMsg}</b>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-12">
                                    <button
                                        onClick={handleSubmit}
                                        className="btn btn-block btn-outline-primary"
                                    >
                                        {" "}
                                        {state.isLoading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"/>
                                        )}{" "}
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{textAlign: "center"}} className="col-md-12">
                        <small className="text-white font-weight-light align-text-bottom">
                            Don't have an account? {" "}
                            <Link to={REGISTER_ROUTE} className="orange-label font-weight-bold">
                                Register Here
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
