import { useSelector, useDispatch } from 'react-redux';
import { signInOut } from '../store/slices/staffSlice';
import StaffListItem from './StaffListItem';
import './StaffList.css';

export default function StaffList() {
  const staff = useSelector(state => state.staff);
  const dispatch = useDispatch();
  const handleClick = id => {
    dispatch(signInOut(id));
  };

  return (
    <ul className='staff-list'>
      {staff.map(member => (
        <StaffListItem key={member.id} {...member} onClick={handleClick} />
      ))}
    </ul>
  );
}
