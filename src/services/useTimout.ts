import React, { useState, useEffect, useRef } from 'react';

type TimeoutCallback = () => void

function useTimout(callback: TimeoutCallback, delay: number) {
    const timeoutRef = useRef<number>();
    const callbackRef = useRef<TimeoutCallback>(callback);

    useEffect(() => {
        callbackRef.current = callback
    }, [callback]);

    useEffect( () => {
        if(delay && callbackRef) {
            timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
        }
    }, [delay])

    return timeoutRef;

}