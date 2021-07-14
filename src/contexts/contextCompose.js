import React, { Fragment } from 'react';

export const ContextCompose = ({ components, children }) => (
    <Fragment>
        {components.reverse().reduce((acc, curr) => {
            const [Provider, props] = Array.isArray(curr)
                ? [curr[0], curr[1]]
                : [curr, {}];
            return <Provider {...props}>{acc}</Provider>;
        }, children)}
    </Fragment>
);