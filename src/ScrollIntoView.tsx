//import {useEffect, useState} from 'react'
//import {RouteComponentProps, withRouter} from 'react-router-dom'
import { useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

/*
const ScrollIntoView = ({location}: RouteComponentProps) => {
    const [prev, setPrev] = useState('')

    useEffect(() => {
        if (prev !== location.pathname) {
            window.scrollTo(0, 0)
            setPrev(location.pathname)
        }
    }, [location])
    return null
}

export default withRouter(ScrollIntoView);
 */