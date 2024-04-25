export default function StaffListItem({
  id,
  firstname,
  lastname,
  onClick,
  signedIn,
}) {
  const handleClick = () => {
    onClick(id);
  };
  let className = 'staff-list-item';
  if (signedIn) {
    className += ' signed-in';
  }
  return (
    <li className={className}>
      <a
        onClick={handleClick}
        role='button'
        className='staff-button'
        tabIndex='0'
        type='button'
      >
        {firstname} {lastname}
      </a>
    </li>
  );
}
