$('#signup-form').submit((event) => {
  event.preventDefault()
  $('#firstNameStatus').empty()
  $('#lastNameStatus').empty()
  $('#emailStatus').empty()
  $('#password1Status').empty()
  $('#password2Status').empty()

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

  if (password1 !== password2) {
    $('#password2Status').append('Passwords do not match')
    return
  }

  const options = {
    data: { firstName, lastName, email, password1 },
    type: 'POST',
    url: '/login/signup'
  };

  $.ajax(options)
    .done(() => {
      window.location.href = '/home'
    })
    .fail(($xhr) => {
      console.log('error happened', $xhr)
    });
})
