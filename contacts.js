const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const listContacts = JSON.parse(data);

    return console.table(listContacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contact = contacts.filter(
      (contact) => contact.id === Number(contactId)
    );

    return console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      (contact) => contact.id != contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    console.table(filteredContacts);
    console.log("Contact is deleted");
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const addContact = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(addContact, null, 2));

    console.table(addContact);
    console.log("Contact is added");
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };