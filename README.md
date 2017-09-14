# CSC490_React
React code for CSC490 senior project

To build and upload React code to the main group project:

- git clone this repo
- add projectGit to your .gitignore file
- in the CSC490_React folder, create a folder called projectGit
- in the projectGit folder, clone the main group project

at this point, your file structure should look like this:

CSC490_React
    node_modules/
        ...(lots of modules)
    src/
        components/
            ...(several React files)
        index.js
    projectGit/
        CSC490-Project
            dist/
                bundle.js
                index.css
                index.html
            node_modules
            index.js
            package.json
    .gitignore (which is ignoring projectGit)
    README.md
    package.json
    webpack.config.js

now, from the CSC490_React folder, npm install to get all the node modules installed
at this point you can type "npm start" and webpack will build in dev mode and you can edit the code and see changes in the browser at port 8080

in order to build the code for production, run "webpack" from the CSC490_React folder, and it will update the dist/ folder in projectGit/CSC490-Project/dist
now you can move into the CSC490-Project folder:
   - 'git pull' to make sure you have the latest changes from the group project
   - 'git add .' to include the contents of the dist/ folder that were just updated
   - 'git commit -m "some short relevant message"' to commit files
   - 'git push -u origin master' to upload the pulled files plus the new dist/ contents to the main group repo

This should all work! If it doesn't, or there is any confusion at all, let me know and we'll figure it out.
