import PropTypes from 'prop-types';
import { Component } from 'react';

import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleOnInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    console.log('this state', this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
      filter: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleOnSubmit} className={s.form}>
        <label className={s.inputLabel}>
          <span className={s.label}> Name</span>
          <input
            onChange={this.handleOnInputChange}
            type="name"
            name="name"
            value={name}
            className={s.nameInput}
            required
          ></input>
        </label>
        <label className={s.inputLabel}>
          <span className={s.label}> Number</span>
          <input
            type="tel"
            name="number"
            onChange={this.handleOnInputChange}
            value={number}
            className={s.nameInput}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export { ContactForm };
