import React, {useState} from "react";
import {convStrToSHA256} from "../../../utils/HashConverter";
import history from "../../../history";
import {UPDATE_PASSWORD_API} from "../../../constants/api_routes";
import {SERVER_URL} from "../../../config/config";
import {LOGIN_ROUTE} from "../../../constants/page_routes";
import {Link} from "react-router-dom";
import {PASSWORD_VALIDATION_REGEX} from "../../../constants/regex";
import {validateForm} from "../../../constants/constants";



export function ResetPasswordForm() {
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        isLoading: false,
        errorMsg: "",
        errors: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleChange = (event) => {
        // Handling user Input
        if(state.errorMsg !== "") {
            setState({...state, errorMsg: ""})
        }

        const {name, value} = event.target;
        let errors = state.errors;
        switch (name) {
            case "password":
                errors.password =
                    value.length < 1
                        ? "Password is required!"
                        : PASSWORD_VALIDATION_REGEX.test(value) ? "" :
                        "New Password must contain at least 8 characters, 1 number, 1 lowercase, 1 uppercase, 1 special character (!@#$%^&*)!";
                break;
            case "confirmPassword":
                errors.confirmPassword =
                    value.length < 1
                        ? "Confirm Password is required!"
                        : "";
                break;
            default:
                break;
        }

        setState({...state, errors, [name]: value});
    };

    const handleSubmit = async () => {
        if (validateForm(state.errors)) {
            if (state.password !== state.confirmPassword) {
                setState({...state, errorMsg: "Password and confirm password did not matched!"})

            } else if (history.location.search !== "" && history.location.search.startsWith("?token=")) {
                const splitStr = history.location.search.split("token=")
                await SERVER_URL.put(UPDATE_PASSWORD_API, {
                    password: convStrToSHA256(state.password),
                    token: splitStr[1],
                })
                    .then((res) => {
                        setState({...state, isLoading: false, errorMsg: "Password reset successful."})

                    })
                    .catch((error) => {
                        setState({...state, isLoading: false, errorMsg: error.response.data.errorMessage})
                    });
            } else {
                setState({...state, errorMsg: "URL is malformed."})
            }
        }
    };

    return (
        <div
            style={{maxWidth: "400px", marginTop: "10vh"}}
            className="container col-12 col-md-4 d-flex  justify-content-center"
        >
            <div className="card-body transparent-bg">
                <div className="row">
                    <div className="col-md-12 text-center ">
                        <h2>Reset Password</h2>
                    </div>
                    <div className="col-md-12 pt-3 text-white">
                        <p>
                            <small>Please enter new password.</small>
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
                                        type="password"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="password"
                                        placeholder="*New Password"
                                        required
                                    />
                                    {state.errors.password.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.errors.password}
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
                                        name="confirmPassword"
                                        placeholder="*Confirm Password"
                                        required
                                    />
                                    {state.errors.confirmPassword.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.errors.confirmPassword}
                                        </div>
                                    )}
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
                                        className="btn btn-block btn-outline-primary"
                                        type="submit"
                                    >
                                        {state.isLoading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"/>
                                        )}
                                        Reset Password
                                    </button>
                                </div>
                            </div>

                            <div style={{textAlign: "center"}} className="col-md-12">
                                <small className="text-white font-weight-light align-text-bottom">
                                    Reset password successful? {" "}
                                    <Link to={LOGIN_ROUTE} className="blue-label font-weight-bold">
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
