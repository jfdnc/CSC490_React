var mv = require('mv')

mv('./build/static/','../ServerCode/public/static/',{mkdirp:true},function(err){console.log(err)})
mv('./build/index.html','../ServerCode/public/index.html',{mkdirp:true},function(err){console.log(err)})
