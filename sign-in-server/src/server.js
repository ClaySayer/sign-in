import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  fetchStaff,
  signInOut,
  serializeStore,
  selectStaff,
} from './store/slices/staffSlice.js';

const types = {
  pushStaff: 'socket/pushStaff',
  requestStaff: 'socket/requestStaff',
  signInOut: 'socket/signInOut',
};

const pushStaff = staff => ({
  type: types.pushStaff,
  payload: staff,
});

const observeStore = (store, select, onChange) => {
  let currentState;
  const handleChange = () => {
    const nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  };
  return store.subscribe(handleChange);
};

let observers = [];

const clientActions = connection => (dispatch, getState) => {
  const { action } = connection;
  switch (action.type) {
    case types.requestStaff:
      dispatch(fetchStaff());
      break;
    case types.signInOut:
      dispatch(signInOut(action.payload));
      dispatch(serializeStore());
      break;
    default:
  }
};

export const start = (port, store) => {
  const httpServer = createServer();
  const io = new Server(httpServer);
  io.on('connection', socket => {
    observers.push({
      unsubscribe: observeStore(store, selectStaff, state => {
        if (!state.fetching && state.data.length > 0) {
          socket.emit('action', pushStaff(state.data));
        }
      }),
      socketId: socket.id,
    });
    socket.on('action', action => {
      store.dispatch(clientActions({ action }));
    });
    socket.on(
      'disconnect',
      () =>
        (observers = observers.reduce((acc, observer) => {
          if (socket.id === observer.socketId) {
            observer.unsubscribe();
            return acc;
          }
          return [...acc, observer];
        }, [])),
    );
  });
  httpServer.listen(port, () => {
    console.log(`Listening on PORT: ${port}`);
  });
};
