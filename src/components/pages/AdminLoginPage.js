import React from 'react';
import {Logo} from "../ui/common/Logo";
import {HeaderTitle} from "../ui/common/HeaderTitle";
import {AdminLoginForm} from "../sections/admin/AdminLoginForm";

export function AdminLoginPage() {

    return (
        <>
            <Logo/>
            <HeaderTitle/>
            <AdminLoginForm/>
        </>
    );
}
