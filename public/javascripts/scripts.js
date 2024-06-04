let directory = {
  contacts: null,
}

async function updateContactsList() {
  let response = await fetch('http://localhost:3000/api/contacts');
  let contacts = await response.json();
  directory.contacts = contacts;
  let contactTemplate = Handlebars.compile($('#contact-template').html());
  $('.contact-list-container').html(contactTemplate(directory));
}

async function addContact(json) {
  await fetch('http://localhost:3000/api/contacts/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json)
  })
  updateContactsList();
}

async function deleteContact(id) {
  await fetch(`http://localhost:3000/api/contacts/${id}`, {
    method: "DELETE",
  })
  updateContactsList();
}

async function updateContact(id, json) {
  await fetch(`http://localhost:3000/api/contacts/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(json)
  })
  updateContactsList();
}

async function getContact(id) {
  let response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
    method: "GET"
  })
  let contact = await response.json();
  return contact;
}

function togglePopup() { 
  const overlay = document.getElementById('popupOverlay'); 
  overlay.classList.toggle('show'); 
} 

$(function() {
  updateContactsList();
  let form = document.querySelector('form');
  
  $('table').on('click', function(event) {
    if ($(event.target).hasClass("delete-button")) {
      let id = $(event.target).closest('.contact').attr('id');
      deleteContact(id);
    } else if ($(event.target).hasClass("edit-button")) {
      let id = $(event.target).closest('.contact').attr('id');
      let contact = getContact(id);
      contact.then((response) => {
        $('#name').val(response.full_name);
        $('#email').val(response.email);
        $('#number').val(response.phone_number);
      })
      $(form).addClass('update');
      $(form).attr('id', id)
      togglePopup();
    }
  });

  $(form).on('submit', function(event) {
    event.preventDefault();
    let data = {
      full_name: $('#name').val(),
      email: $('#email').val(),
      phone_number: $('#number').val(),
    }
    if ($(form).hasClass('update')) {
      let id = $(form).attr('id');
      updateContact(id, data);
      $(form).removeClass('update');
      $(form).removeAttr('id');
    } else {
      addContact(data);
    }
    togglePopup();
    $(form).trigger("reset");
  });
})

