module.exports = {

    'facebookAuth' : {
        'clientID'      : '493485674350812', // your App ID
        'clientSecret'  : '03ceac9747b590992fa0e0f28bca2557', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebookLogin/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    },
     "mongo":{
        "development":{
            "connectionString":"mongodb://admin:csc490@108.234.184.90/admin"
        },
        "production":{}
    }

};