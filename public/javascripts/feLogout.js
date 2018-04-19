$(document).ready(() => {
  $('#logoutLink').click((event) => {
      event.preventDefault()
      console.log('Logout clicked')
      const options = {
        dataType: 'json',
        type: 'DELETE',
        url: '/'
      }
      $.ajax(options)
        .done(() => {
          console.log('Back to frontend ---> SUCCESS TO LOGOUT')
          window.location.href = '/'
        })
        .fail(() => {
          console.log('Back to FrontEnd --> fail to log out')
        })
    })
})
