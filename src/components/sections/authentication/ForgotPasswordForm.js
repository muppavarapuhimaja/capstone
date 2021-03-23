import React, {useState} from "react";
import {EMAIL_VALIDATION_REGEX} from "../../../constants/regex";
import {RESET_PASSWORD_API} from "../../../constants/api_routes";
import {SERVER_URL} from "../../../config/config";
import {LOGIN_ROUTE, RESET_PASSWORD_ROUTE} from "../../../constants/page_routes";
import {Link} from "react-router-dom";

export function ForgotPasswordForm() {
    const [state, setState] = useState({
        email: "",
        error: ""
    });
    const [errors, setCustomErrors] = useState(null);

    const handleChange = (event) => {

        // Handling user Input
        setCustomErrors("");
        event.preventDefault();
        const {name, value} = event.target;
        setState({
            ...state, [name]: value,
            error: value.length < 1
                ? "Email is required!"
                : EMAIL_VALIDATION_REGEX.test(value) ? "" : "Email is not valid!"
        });
    };
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        await SERVER_URL.post(RESET_PASSWORD_API, {
            email: state.email,
            passwordResetURL: window.location.origin + RESET_PASSWORD_ROUTE
        })
            .then((res) => {
                setIsLoading(false);
                setCustomErrors("Reset link sent to your email address.");
            })
            .catch((error) => {
                setIsLoading(false);
                try {
                    if (error.response.data.errorCode === 404) {
                        setCustomErrors("Email is not registered."); //display the Error message
                    } else {
                        setCustomErrors(error.message); //display the Error message
                    }
                } catch (e) {
                    // do nothing. Something went wrong.
                }
            });
    };

    return (
        <div
            style={{maxWidth: "450px", marginTop: "10vh"}}
            className="container col-12 col-md-4 d-flex  justify-content-center"
        >
            <div className="card-body transparent-bg">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>Forgot Password</h2>
                    </div>
                    <div className="col-md-12 pt-3 text-white">
                        <p>
                            <small>Please enter your username address. You will
                                receive a link to create a new password via username.</small>
                        </p>
                    </div>

                    <div className="col-md-12">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(e);
                            }}
                        >
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
                                    />
                                    {state.error.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.error}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-11 ml-3 pl-1 text-danger bg-light">
                                    <b>{errors}</b>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-block btn-outline-primary"
                                        type="submit"
                                    >
                                        {isLoading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"/>
                                        )}
                                        Get New Password
                                    </button>
                                </div>
                            </div>

                            <div style={{textAlign: "center"}} className="col-md-12">
                                <small className="text-white font-weight-light align-text-bottom">
                                    Already have an account? {" "}
                                    <Link to={LOGIN_ROUTE} className="orange-label font-weight-bold">
                                        Login Here
                                    </Link>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
