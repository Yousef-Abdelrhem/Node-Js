const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

// const fileAddress = path.join(__dirname, "Contact.json");
// console.log(path);

// get the contacts
function getContacts() {
  try {
    let data = fs.readFileSync("Contacts.json", "utf-8");
    data = JSON.parse(data);
    return data;
  } catch (e) {
    console.log(e);
    return []; // if the array is empty
  }
}

/// write on the json file

function addContact(name, phone, email) {
  let newContact = { name: name, phone: phone, email: email };
  let contacts = getContacts();
  contacts.push(newContact);
  fs.writeFileSync("Contacts.json", JSON.stringify(contacts));
}
/// add the contact
function add(args) {
  let name = args[2];
  let phone = args[4];
  let email = args[6];

  if (validateName(args) && validatePhone(args) && validateEmail(args)) {
    addContact(name, phone, email);
  }
}
/// search for contacts
function search(args) {
  if (validateName(args)) {
    let contacts = getContacts();
    let contact = contacts.filter((item) => {
      return item.name.toLowerCase() === args[2].toLowerCase();
    });
    console.log(contact);
  }
}
/// delete Contact
function deleteContact(args) {
  if (validateName(args)) {
    let contacts = getContacts();
    let updatedContacts = contacts.filter((item) => {
      return item.name.toLowerCase() !== args[2].toLowerCase();
    });
    fs.writeFileSync("Contacts.json", JSON.stringify(updatedContacts));
    console.log(updatedContacts);
  }
}

/// validate data
function validateEmail(args) {
  let email = args[6];
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexPhoneNumber = /^\d{10}$/;

  if (!regexEmail.test(email)) {
    console.log("enter valid email");
    return false;
  }
  return true;
}
/// validate number
function validatePhone(args) {
  let phone = args[4];
  const regexPhoneNumber = /^\d{10}$/;
  if (!regexPhoneNumber.test(phone)) {
    console.log("enter valid number 10 digits");
    return false;
  }
  return true;
}
/// validate Name
function validateName(args) {
  let name = args[2];

  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;
  if (!regexName.test(name)) {
    console.log("Enter a Valid Name");
    return false;
  }
  return true;
}
function AddContactCli() {
  const args = process.argv.splice(2);
  if (args[0] === "add") {
    add(args);
  } else if (args[0] === "list") {
    console.log(getContacts());
  } else if (args[0] === "search") {
    search(args);
  } else if (args[0] === "delete") {
    deleteContact(args);
  } else {
    console.log("Enter one of those Orders add, list, search, delete");
  }
}
AddContactCli();
