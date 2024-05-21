import { mount } from 'marketing/MarketingApp';
import React, {useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    // starting value is null
    const ref = useRef(null);
    // history obj being used inside container
    const history = useHistory();
    // useEffect makes sure code is run one single time when component is first displayed
    // useEffect will run each time there is any change to the component, to limit this add a dependency array as a second arg
    // only run when marketing app is first rendered
    useEffect(() => {
        // provide reference to the html element
        // mount will create an instance of marketing app and pass it into the div
        const { onParentNavigate } = mount(ref.current, {
            // onNavigate is a callback fx, it is passed down to marketing when the MOUNT fx is called to update the path in container, browser history
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });
        history.listen(onParentNavigate)
    }, []);
    // return a plain div with a ref to the html that is being displayed on the screen
    return <div ref={ref} />
};

