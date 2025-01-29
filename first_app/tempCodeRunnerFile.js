function addContact(name, phone, email) {
  let contacts = getContacts();
  contacts.push(newContact);
  fs.writeFileSync("Contact.json", JSON.stringify(contacts));
}
