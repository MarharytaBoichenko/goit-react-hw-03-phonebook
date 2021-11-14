import { Component } from 'react';
import './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import { saveToLS, getFromLS } from './components/helpers/helpers';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const parsedContactsFromLs = getFromLS('contactsData');
    console.log(parsedContactsFromLs);
    //проверять есть ли что -то  в LS
    if (parsedContactsFromLs) {
      this.setState({ contacts: parsedContactsFromLs });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(' componentDidUpdate');
    console.log(prevState);
    console.log(this.state);

    //// проверка, перед тем как записать
    if (this.state.contacts !== prevState.contacts) {
      console.log('component  updated');
      saveToLS('contactsData', this.state.contacts);
    }
  }
  filterHandler = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  formSubmitHandler = data => {
    const contact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => {
      console.log(contact.name);
      const nameInContact = contact.name.toLowerCase().trim();
      const isInContact = prevState.contacts.find(
        cont => cont.name.toLowerCase().trim() === nameInContact,
      );
      console.log(contact.name);
      console.log(isInContact);
      if (isInContact) {
        alert(`${contact.name} is already in contact`);
        return;
      }
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toString().toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter, value } = this.state;
    const visibleContacts = this.getVisibleContact();
    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          value={value}
          onChange={this.handleOnInputChange}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterHandler} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
