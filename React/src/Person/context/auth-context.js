import React from 'react';

const authContext = React.createContext({
    isAuthenticate: false,
    login: () => {}
});

export default authContext;