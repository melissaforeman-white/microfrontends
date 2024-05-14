import { mount } from 'marketing/MarketingApp';
import React, {useRef, useEffect } from 'react';

export default () => {
    // starting value is null
    const ref = useRef(null);
    // useEffect makes sure code is run one single time when component is first displayed
    useEffect(() => {
        // provide reference to the html element
        // mount will create an instance of marketing app and pass it into the div
        mount(ref.current);
    });
    // return a plain div with a ref to the html that is being displayed on the screen
    return <div ref={ref} />
};