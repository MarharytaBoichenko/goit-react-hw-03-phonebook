import PropTypes from 'prop-types';
import s from './ContactItem.module.css';
const ContactItem = ({ id, name, number }) => {
  return (
    <div className={s.contactItem}>
      <p className={s.contactName}> {`${name}:`}</p>{' '}
      <p className={s.contactNumber}> {number}</p>
    </div>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
export { ContactItem };
