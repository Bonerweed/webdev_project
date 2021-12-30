# webdev_project
course project
Oh boy documentation!

#how to run:
1) clone repositroy
2) run npm install
3) start server with npm start
4) by default project runs on localhost:3000

#Troubleshooting:
- make sure you have mongoDB installed
  - current branch is running on version 4.2.17
- project has been developed on Windows architecture, so GNU and OSX users might run into issues caused by case sensitive typoes
- in order to give a newly registrated user admin rights, one must manually set them to *true* over at '/routes/users.js:124'


#Features:
- MongoDB to store users, threads and comments
- JWT authentication
- non-registered viewers can still view threads and comments
- registered and logged in users can start new threads and comment exiting ones
- thread authors can edit their threads, and system shows if a thread has been edited
- admins can delete unruly threads
- ui scales to screens

#used tech:
- MongoDB and Mongoose
- pug
- materialize

#Currently know issues:
- database might be empty upon cloning repo, but trust me you'll not miss anything important
