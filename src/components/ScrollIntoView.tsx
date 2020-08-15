import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const ScrollIntoView = ({location}: RouteComponentProps) => {
    const [prev, setPrev] = useState("");

    useEffect(() => {
        if (prev !== location.pathname) {
            window.scrollTo(0, 0);
            setPrev(location.pathname);
        }
    }, [location]);
    return null
};

export default withRouter(ScrollIntoView);