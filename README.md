# webdev_project
course project
Oh boy documentation!

#how to run:
1) clone repositroy
2) run npm install
3) start server with npm start
  3.a) by default project runs on localhost:3000
~~4) suffer~~

#Troubleshooting:
- make sure you have mongoDB installed
  - current branch is running on version 4.2.17
- project has been developed on Windows architecture, so GNU and OSX users might run into issues caused by case sensitive typoes


#Features:
- MongoDB to store users, threads and comments
- JWT authentication
- non-registered viewers can still view threads and comments
- registered and logged in users can start new threads and comment exiting ones
- people with special permissions can do other administrative chaos such as removing users

#used tech:
- MongoDB and Mongoose

#Currently know issues:
- visual look is quite ascetic
- sometimes token authorization fails
- logging out has some interesting "features" and only works in localhost:300/
- viewing a thread has routing issues
  - a hardcoded proof of concept might be available over at '/threads/comments'
- code attempts to be self-describing, so commenting is a bit scarce

#After biggest hurdles are cleared, you can expect:
- editing threads, and see if it has been edited
- less eye-bleeding look
- inner-workings-for-dummies comments
