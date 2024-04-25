import { Provider } from 'react-redux';
import { createSocket } from './sockets/socket';
import StaffList from './components/StaffList';
import store from './store/store';

createSocket(store);
export default function App() {
  return (
    <Provider store={store}>
      <StaffList />
    </Provider>
  );
}
