# Sign In

## Description

Sign-in is an experimental/proof of concept real-time application using React and Redux on the front end, sockets for communication (SocketIO) and Node JS and Redux on the backend.

Currently if the client and server applications are running on localhost, multiple browser windows can be opened and when a user is clicked to sign in/out this is broadcast to all other connected clients. The server writes the current state to file and any new connected clients load data from the saved file. It can be made to work across a LAN but the ip address/hostname of the server is required to replace localhost in line 32 of socket.js.

The server contains a simple observeStore function to respond to state changes in the store.

## Getting Started

### Prerequisites

1. Node JS
2. NPM

### Installation

1. Clone repo

```
  git clone https://github.com/ClaySayer/sign-in.git
```

2. Navigate to Server and install NPM packages

```
  cd sign-in-server
  npm install
```

3. Navigate to Client and install NPM packages

```
 cd sign-in-client
 npm install
```

4. Navigate to Server and start

```
 npm start
```

5. Navigate to client and start

```
 npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. Multiple browser tabs can be opened. Clicking on a user will sign them in/out. This will be broadcast to all open connections.

## Further Development:

- Database for storage with timestamps attached to records
- Reconciliation workflow if network is interrupted
- Reporting module for administration
- Reset to all signed out over night
- Abitlity to add and remove users
