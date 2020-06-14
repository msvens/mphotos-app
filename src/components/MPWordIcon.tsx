import React from 'react';

import {ReactComponent as MPWord} from './mp_ordbild.svg';
import {SvgIcon, SvgIconProps} from "@material-ui/core";



function MPWordIcon(props: SvgIconProps) {


    return (
        <MPWord {...props}/>
        /*<SvgIcon component={MPWord} viewBox="0 0 100 100" width="100%" {...props}>
        </SvgIcon>*/
    );
}

export default MPWordIcon