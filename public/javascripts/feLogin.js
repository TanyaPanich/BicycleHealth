$(document).ready(() => {
  console.log('feLogin document ready');
  $('#login-form').submit((event) => {
    event.preventDefault()
    console.log('#login-form clicked');
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
      url: '/login'
    }

    $.ajax(options)
      .done((data) => {
        // Assume good
        console.log('dataaa', data)
        window.location.href = '/home'
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        $('#passwordStatus').append('Wrong password or email')
      });
  })
})
