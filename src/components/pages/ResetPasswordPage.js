import React from 'react';
import {ResetPasswordForm} from "../sections/authentication/ResetPasswordForm";
import {HeaderTitle} from "../ui/common/HeaderTitle";
import {Logo} from "../ui/common/Logo";

export function ResetPasswordPage() {

    return (
        <>
            <Logo/>
            <HeaderTitle/>
            <ResetPasswordForm/>
        </>
    );
}
