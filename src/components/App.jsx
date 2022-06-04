import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    addContact = (name, number) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        const isYourContact = this.state.contacts.find(
            item => item.name.toLowerCase() === name.toLowerCase()
        );

        if (isYourContact) {
            Notify.warning(`${name} is already in your contacts!`);
            return;
        }

        this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
        }));
    };

    deleteContact = id => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== id),
        }));
    };

    filterContacts = filterText => {
        this.setState({ filter: filterText });
    };

    render() {
        const filteredContacts = this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
        );

        return (
            <div className="wrapper">
                <h1 className="title">Phonebook</h1>
                <ContactForm addContact={this.addContact} />
                <h2 className="title">Contacts</h2>
                <Filter filterContacts={this.filterContacts} />
                <ContactList
                    contacts={filteredContacts}
                    deleteContact={this.deleteContact}
                />
            </div>
        );
    }
}
