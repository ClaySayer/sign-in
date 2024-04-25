# Sign In

## Description

Sign-in is an experimental application using React and Redux on the front end, sockets for communication (SocketIO) and Node JS and Redux on the backend.

Currently if the client and server applications are running on localhost, multiple browser windows can be opened and when a user is clicked to sign in/out this is broadcast to all other connected clients. The server writes the current state to file and any new connected clients load data from the saved file.

The server contains a simple observeStore function to respond to state changes in the store
