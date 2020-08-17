import React from 'react';

import {ReactComponent as MPLogoWhite} from './mp_logo_white.svg';

import {SvgIcon, SvgIconProps} from "@material-ui/core";

type MPIconColor = "black" | "white"
export interface MPIconProps extends SvgIconProps{
        mpcolor: MPIconColor
}

function MPIcon(props: MPIconProps) {

    return (
        <SvgIcon component={MPLogoWhite} viewBox="0 0 1085.68 1085.68" {...props}>
        </SvgIcon>
    );
}

export default MPIcon