var mv = require('mv')

mv('./build/static/','../ServerCode/public/static/',function(err){console.log(err)})
