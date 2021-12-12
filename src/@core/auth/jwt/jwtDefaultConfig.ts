export default {
    loginEndpoint: `${process.env.REACT_APP_API_URL}publik/auth/login?lang=id`,
    loginInternalEndpoint: `${process.env.REACT_APP_API_URL}users/login`,
    registerEndpoint: `${process.env.REACT_APP_API_URL}publik/auth/registrasi?lang=id`,
    refreshEndpoint: '',
    logoutEndpoint: `${process.env.REACT_APP_API_URL}publik/auth/logout?lang=id`,

    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',

    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'accessToken',
    storageRefreshTokenKeyName: 'refreshToken'
};
