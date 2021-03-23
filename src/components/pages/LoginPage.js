import React from 'react';
import {LoginForm} from "../sections/authentication/LoginForm";
import {HeaderTitle} from "../ui/common/HeaderTitle";
import {Logo} from "../ui/common/Logo";

export function LoginPage() {

    return (
        <>
            <Logo/>
            <HeaderTitle/>
            <LoginForm/>
        </>
    );
}
