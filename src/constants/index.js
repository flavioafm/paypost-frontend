const PostActions = Object.freeze({
    LOADING: 'loading',
    LOADED: 'loaded'
});

const PlatformList = Object.freeze({
    FACEBOOK: { key:'facebook', logo:'https://cdn-icons-png.flaticon.com/512/124/124010.png', actived: true},
    INSTAGRAM: { key:'instagram', logo:'', actived: false},
    TWITTER: { key:'twitter', logo: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png', actived: true}
});

export { PostActions, PlatformList };