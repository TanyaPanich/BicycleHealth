$('#signup-form').submit((event) => {
  event.preventDefault()

  const firstName = $('#firstName').val().trim()
  const lastName = $('#lastName').val().trim()
  const email = $('#email').val().trim()
  const password1 = $('#password1').val()
  const password2 = $('#password2').val()

  if (!firstName) {
    $('#firstNameStatus').append('First name must not be blank')
    return
  }

  if (!lastName) {
    $('#lastNameStatus').append('Last name must not be blank')
    return
  }

  if (!email) {
    $('#emailStatus').append('Email must not be blank')
    return
  }

  if (email.indexOf('@') < 0) {
    $('#emailStatus').append('Email must be valid')
    return
  }

  if (!password1 || password1.length < 8) {
    $('#password1Status').append('Password must be at least 8 characters long')
    return
  }

  if (!password1 !== password2) {
    $('#password2Status').append('Passwords do not match')
    return
  }

  const options = {
    contentType: 'application/json',
    data: JSON.stringify({ firstName, lastName, email, password1 }),
    dataType: 'json',
    type: 'POST',
    url: '/'
  };

  $.ajax(options)
    .done(() => {
      window.location.href = '/'
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
      console.log('error happened', $xhr)
    });
});
})();
