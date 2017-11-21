module.exports = {

    'facebookAuth' : {
        'clientID'      : '493485674350812', // your App ID
        'clientSecret'  : '03ceac9747b590992fa0e0f28bca2557', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebookLogin/callback'
    },

    //comment this out if you change to global
    //Start local
    'twitterAuth' : {
        'consumerKey'       : 'K596wxqlVxEI61qHNzJhtWvwA',
        'consumerSecret'    : '9cxfKEJUFrj0rCbbeHevOuI20GD6119bSegQozZUKQPKj1n0y7',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },
    //end local

    //uncomment to use global, then comment out local
    //start global
    /*
    'twitterAuth' : {
        'consumerKey'       : 'bC95KC69F9qmxNnlICTBfn2xs',
        'consumerSecret'    : 'hnhZjlvaCrtHWQsUKffvhQZYpmhOIUBuRm7fH6YsYCSglKZybo',
        'callbackURL'       : 'http://34.239.132.148:3000/auth/twitter/callback'
    },
    */
    //end global

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