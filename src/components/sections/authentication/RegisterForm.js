import React, {useState} from "react";
import {Link} from "react-router-dom";
import {ALPHABETS_VALIDATION_REGEX, EMAIL_VALIDATION_REGEX, PASSWORD_VALIDATION_REGEX} from "../../../constants/regex";
import {convStrToSHA256} from "../../../utils/HashConverter";
import {LOGIN_ROUTE} from "../../../constants/page_routes";
import {REGISTER_USER_API} from "../../../constants/api_routes";
import {SERVER_URL} from "../../../config/config";
import {setTokenInCookie} from "../../../utils/Token";
import {validateForm} from "../../../constants/constants";

export function RegisterForm() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        organization: "",
        phoneNumber: "",
        acceptConditions: "",
        errors: {
            organization: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        isLoading: false,
        errorMsg: ""
    });

    const handleChange = (event) => {
        if (state.errorMsg !== "") {
            setState({...state, errorMsg: ""})
        }

        const {name, value} = event.target;
        let errors = state.errors;
        switch (name) {
            case "firstName":
                errors.firstName =
                    value.length < 1
                        ? "Firstname is required!"
                        : ALPHABETS_VALIDATION_REGEX.test(value) ? "" : "Firstname must contain only english alphabets!"
                break;
            case "lastName":
                errors.lastName =
                    value.length < 1
                        ? "Lastname is required!"
                        : ALPHABETS_VALIDATION_REGEX.test(value) ? "" : "Lastname must contain only english alphabets!"
                break;
            case "email":
                errors.email =
                    value.length < 1
                        ? "Email is required!"
                        : EMAIL_VALIDATION_REGEX.test(value) ? "" : "Email is not valid!";
                break;
            case "password":
                errors.password =
                    value.length < 1
                        ? "Password is required!"
                        : PASSWORD_VALIDATION_REGEX.test(value) ? "" :
                        "Password must contain at least 8 characters, 1 number, 1 lowercase, 1 uppercase, 1 special character (!@#$%^&*)!";
                break;
            case "confirmPassword":
                errors.confirmPassword =
                    value.length < 1
                        ? "Confirm Password is required!"
                        : "";
                break;
            case "organization":
                errors.organization =
                    value.length < 1
                        ? "Organization name is required!"
                        : "";
                break;
            default:
                break;
        }
        setState({...state, errors, [name]: value});
    };

    const handleSubmit = async () => {
        if (validateForm(state.errors)) {

            //checking if all the fields are valid
            if (state.password !== state.confirmPassword) {
                //checking if passwords match
                setState({...state, errorMsg: "Password and confirm password did not matched!"})

            } else {
                setState({...state, isLoading: true, errorMsg: ""})
                await SERVER_URL.post(REGISTER_USER_API, {
                    companyName: state.organization,
                    email: state.email,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    password: convStrToSHA256(state.password),
                    phone: state.phoneNumber,
                })
                    .then((res) => {
                        setState({...state, isLoading: false, errorMsg: ""})
                        if (res.data.hasOwnProperty("token")) {
                            setTokenInCookie(res.data.token)
                        }
                    })
                    .catch((error) => {
                        setState({...state, isLoading: false, errorMsg: error.response.data.errorMessage})
                    });
            }
        }
    };

    return (
        <div
            style={{maxWidth: "500px"}}
            className="container col-12 col-md-4 justify-content-center">
            <div className="card-body transparent-bg">
                <div className="row">
                    <div className="col-md-12 text-center ">
                        <h2>Create Account</h2>
                    </div>
                    <div className="col-md-12">
                        <p>
                            <small style={{fontWeight: 600}}>
                                Please fill in the information to get your account.</small>
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
                                <div className="form-group col-md-6">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="text"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="firstName"
                                        placeholder="*First Name"
                                        required
                                    />
                                    {state.errors.firstName.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.errors.firstName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="text"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="lastName"
                                        placeholder="*Last Name"
                                        required
                                    />
                                    {state.errors.lastName.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.errors.lastName}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="text"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="organization"
                                        placeholder="*Organization Name"
                                        required
                                    />
                                    {state.errors.organization.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.errors.organization}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="email"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="email"
                                        placeholder="*Email"
                                        required
                                    />
                                    {state.errors.email.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
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
                                        name="password"
                                        placeholder="*Password"
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
                            <div className="form-row" style={{height: 50}}>
                                <div className="form-group col-md-12">
                                    <input
                                        style={{border: "1px solid #2196f3"}}
                                        type="tel"
                                        onChange={handleChange}
                                        className="form-control"
                                        name="phoneNumber"
                                        value={state.phoneNumber}
                                        placeholder="Phone (Optional)"
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{height: 40}}>
                                <div className="form-group" style={{width: "100%"}}>
                                    <div className="row no-gutters">
                                        <div className="col-1 justify-content-start">
                                            <input
                                                style={{
                                                    marginLeft: 0,
                                                    position: "relative",
                                                    width: "inherit",
                                                    marginTop: 10
                                                }}
                                                onChange={(e) =>
                                                    setState({...state, acceptConditions: e.target.checked})
                                                }
                                                type="checkbox"
                                                className="form-check-input"
                                                id="Check1"
                                                required
                                            />
                                        </div>
                                        <div className="col-11">
                                            <label
                                                style={{
                                                    fontSize: "0.75em",
                                                    color: "white",
                                                    paddingTop: 7
                                                }}
                                                className="form-check-label">
                                                *I accept terms and conditions (view{" "}
                                                <a href="https://www.galendata.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                                                    <b>Privacy policy</b>
                                                </a>
                                                )
                                            </label>
                                        </div>
                                    </div>
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
                                        {" "}
                                        {state.isLoading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"/>
                                        )}{" "}
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style={{textAlign: "center"}} className="col-md-12">
                        <small className="text-white font-weight-light align-text-bottom">
                            Already have an account? {" "}
                            <Link to={LOGIN_ROUTE} className="blue-label font-weight-bold">
                                Login Here
                            </Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
