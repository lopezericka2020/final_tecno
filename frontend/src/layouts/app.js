
import React from 'react';

import AppRoute from "../routes/appRoute";
import HeaderComponent from "./header";
import SidebarComponent from "./sidebar";

export default function AppMain(props) {
    return (
        <>
            <HeaderComponent />
            <SidebarComponent />
            <AppRoute />
        </>
    );
};
