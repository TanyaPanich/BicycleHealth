$(document).ready(() => {
  console.log('FE document profile ready')
  // setButtons(false, false)
  $.ajax({
    url: '/profile',
    type: 'GET',
    dataType: "json",
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    success: (data) => {
      console.log('data success', data)
      addFormSubmitListener(data)
      // addNicknameSelectListener(data.profiles)
    },
    error: (err) => {
      console.log('err', err)
    }
  })
})

const addFormSubmitListener = (profiles) => {
  $('#edit-profile').click((event) => {
    console.log("event:", event)
    event.preventDefault()

  })
}


// const updateInputFields = (profile) => {
//   if (profile) {
//     $('#type').val(profile.type)
//     $('#profileBrand').val(profile.brand)
//     $('#model').val(profile.model)
//   } else {
//     $('#type').val('Choose...')
//     $('#profileBrand').val('')
//     $('#model').val('')
//   }
// }
