$(document).ready(() => {
  $('#login-form').submit((event) => {
    event.preventDefault()
    $('#emailStatus').empty()
    $('#passwordStatus').empty()

    const email = $('#InputLoginEmail').val().trim()
    const password = $('#InputLoginPassword').val()

    if (!email) {
      $('#emailStatus').append('Email must not be blank')
      return
    }

    if (email.indexOf('@') < 0) {
      $('#emailStatus').append('Email must be valid')
      return
    }

    if (!password || password.length < 3) {
      $('#passwordStatus').append('Password must be at least 8 characters long')
      return
    }

    const options = {
      data: { email, password },
      type: 'POST',
      url: '/login/login'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/index'
        console.log("I am back")
      })
      .fail(($xhr) => {
        console.log('error happened', $xhr)
      });
  })
})
