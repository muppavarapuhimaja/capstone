import React from 'react';
import {ForgotPasswordForm} from "../sections/authentication/ForgotPasswordForm";
import {HeaderTitle} from "../ui/common/HeaderTitle";
import {Logo} from "../ui/common/Logo";

export function ForgotPasswordPage() {

    return (
        <>
            <Logo/>
            <HeaderTitle/>
            <ForgotPasswordForm/>
        </>
    );
}
