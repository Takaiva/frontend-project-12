const apiPath = '/api/v1';

export default {
    signInPath: () => [apiPath, 'login'].join('/'),
    signUpPath: () => [apiPath, 'signup'].join('/'),
    dataPath: () => [apiPath, 'data'].join('/'),
    chatPagePath: () => '/',
    signInPagePath: () => '/login',
    signUpPagePath: () => '/signup',
};
