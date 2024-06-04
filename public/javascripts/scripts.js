let directory = {
  contacts: null,
}

sampleContact = {
  full_name: "Eddie Murphy",
  email: "ggeddie123@gmail.com",
  phone_number: 8024457812,
  tags: null,
}



$(function() {

  async function fetchContacts() {
    let response = await fetch('http://localhost:3000/api/contacts');
    let contacts = await response.json();
    directory.contacts = contacts;
    let contactTemplate = Handlebars.compile($('#contact-template').html());
    $('.contact-list-container').html(contactTemplate(directory));
  }

  fetchContacts();
  

  // fetch('http://localhost:3000/api/contacts/', {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(sampleContact)
  // })


})

