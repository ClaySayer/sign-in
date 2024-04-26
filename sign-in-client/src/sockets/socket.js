import io from 'socket.io-client';
import { pushStaff, signInOut } from '../store/slices/staffSlice';

const requestStaff = 'socket/requestStaff';

const types = {
  requestStaff,
  pushStaff: 'socket/pushStaff',
  signInOut: 'socket/signInOut',
};

const requestStaffAction = () => ({
  type: types.requestStaff,
  module: 'socket',
});

const socketSignInOut = payload => ({
  type: types.signInOut,
  payload,
});

const RECONCILE_DELAYED_ACTIONS = 'RECONCILE_DELAYED_ACTIONS';
const reconcileDelayedActions = payload => ({
  type: RECONCILE_DELAYED_ACTIONS,
  payload,
});

let socket;
const delayedActions = [];

export const createSocket = store => {
  socket = io('localhost:3005', { transports: ['websocket'] });
  socket.on('connect', () => {
    store.dispatch(requestStaffAction());
  });
  socket.on('action', action => {
    switch (action.type) {
      case types.pushStaff:
        store.dispatch(pushStaff(action.payload));
        break;
      default:
    }
  });
};

const socketMiddleware = store => next => action => {
  if (socket && socket.connected) {
    if (delayedActions.length > 0) {
      socket.emit('action', reconcileDelayedActions(delayedActions));
    }
    switch (action.type) {
      case types.pushStaff:
        socket.emit('action', pushStaff());
        break;
      case signInOut.type:
        socket.emit('action', socketSignInOut(action.payload));
        break;
      default:
    }

    if (action.module && action.module === 'socket') {
      socket.emit('action', action);
    }
  } else if (action.type === 'SIGN_IN_OUT') {
    delayedActions.push(action);
  }
  return next(action);
};

export default socketMiddleware;
