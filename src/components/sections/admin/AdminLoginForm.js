import React, {useState} from "react";
import {ADMIN_HOME_ROUTE} from "../../../constants/page_routes";
import {VERIFY_USER_API} from "../../../constants/api_routes";
import {SERVER_URL} from "../../../config/config";
import {setTokenInCookie} from "../../../utils/Token";
import {ADMIN_TOKEN_COOKIE} from "../../../constants/constants";
import {convStrToSHA256} from "../../../utils/HashConverter";

export function AdminLoginForm() {
    const [state, setState] = useState({
        username: "",
        password: "",
        errors: {
            username: "",
            password: "",
        },
        isLoading: false,
        errorMsg: null
    });

    const handleChange = (event) => {
        //handling input of user
        const {name, value} = event.target;
        let errors = state.errors;

        switch (name) {
            case "username":
                errors.username =
                    value.length < 1
                        ? "Lastname is required!"
                        : "";
                break;
            case "password":
                errors.password =
                    value.length < 1
                        ? "Lastname is required!"
                        : "";
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
            email: state.username,
            password: convStrToSHA256(state.password), //hashed password
        })
            .then(res => {
                if (res.data.hasOwnProperty("token")) {
                    setTokenInCookie(res.data.token, ADMIN_TOKEN_COOKIE, ADMIN_HOME_ROUTE)
                }
                setState({...state, isLoading: false, errorMsg: null})
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
                    <div className="col-md-12 text-center p-3">
                        <h2>Admin Login</h2>
                    </div>

                    <div className="col-md-12">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="username"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="*Username"
                                        required
                                    />
                                    {state.errors.username.length > 0 && (
                                        <div className="alert alert-danger instant-validation-msg" role="alert">
                                            {state.errors.username}
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
                </div>
            </div>
        </div>
    );
}
