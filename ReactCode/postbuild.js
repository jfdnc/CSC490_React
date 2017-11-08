const mv = require('mv')
const del = require('del')

del(['../ServerCode/public/static', '../ServerCode/public/index.html'], {force:true}).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    mv('./build/static/','../ServerCode/public/static/',{mkdirp:true},function(err){console.log(err)})
    mv('./build/index.html','../ServerCode/public/index.html',{mkdirp:true},function(err){console.log(err)})

});
