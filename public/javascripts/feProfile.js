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
    // contentType: "application/json; charset=utf-8",
    success: (data) => {
      console.log('data success', data)
      // addFormSubmitListener(data.profiles)
      // addNicknameSelectListener(data.profiles)
    },
    error: (err) => {
      console.log('err', err)
    }
  })
})

// const addNicknameSelectListener = (profiles) => {
//   $('#nickname').change(function() {
//     const value = $(this).val()
//     console.log('value', value)
//     if (value in profiles) {
//       console.log('value', value, 'is in profiles')
//       setButtons(false, true)
//       updateInputFields(profiles[value])
//       $('#newNickname').val('')
//     } else if (['New', 'Choose...'].includes(value)) {
//       console.log('value', value, 'is new or unset')
//       setButtons(value === "New", false)
//       updateInputFields()
//     } else {
//       console.log('invalid value', value)
//     }
//   })
// }

const addFormSubmitListener = (profiles) => {
  $('#edit-profile').click((event) => {
    console.log("event:", event)
    event.preventDefault()
    // $('#firstName').empty()
    // $('#lastName').empty()
    // $('#profileEmail').empty()
    // $('#profilePassword1').empty()
    // $('#profilePassword2').empty()
    //
    // let nickname = ''
    // let profileid = ''
    // let strava_gear_id = ''
    // let distance = ''
    // let distance_unit = ''
    //
    // const nicknameSelector = $('#nickname').val()
    // if (nicknameSelector in profiles) {
    //   if (event.currentTarget.id === 'addprofile') {
    //     $('#doneStatus').append('This operation is not supported for existing profile')
    //     return
    //   }
    //   nickname = nicknameSelector
    //
    //   profileid = profiles[nickname].id
    //   strava_gear_id = profiles[nickname].strava_gear_id
    //   distance = profiles[nickname].distance
    //   distance_unit = profiles[nickname].distance_unit
    //   if (event.currentTarget.id === 'updateprofile') {
    //     nickname = $('#newNickname').val().trim()
    //   }
    // } else if (nicknameSelector == 'New') {
    //   if (event.currentTarget.id !== 'addprofile') {
    //     $('#doneStatus').append('This operation is not supported for new profile')
    //     return
    //   }
    //   nickname = $('#newNickname').val().trim()
    // } else {
    //   $('#newNicknameStatus').append('Please select valid nickname option')
    //   return
    // }
    //
    // const type = $('#type').val().trim()
    // const brand = $('#profileBrand').val().trim()
    // const model = $('#model').val().trim()
    //
    // console.log("nickname:", nickname)
    // console.log("type:", type)
    // console.log("brand:", brand)
    // console.log("model:", model)
    //
    // if (!nickname) {
    //   $('#newNicknameStatus').append('Nickname must not be blank')
    //   return
    // }
    //
    // if (!type || type === 'Choose...') {
    //   $('#typeStatus').append('Please choose a type')
    //   return
    // }
    //
    // if (!brand) {
    //   $('#brandStatus').append('Brand must not be blank')
    //   return
    // }
    //
    // if (!model) {
    //   $('#modelStatus').append('Model must not be blank')
    //   return
    // }
    //
    // let requestParams = {
    //   data: {
    //     nickname,
    //     type,
    //     brand,
    //     model,
    //     profileid,
    //     strava_gear_id,
    //     distance,
    //     distance_unit
    //   },
    //   url: '/profile'
    // }
    // switch (event.currentTarget.id) {
    //   case 'addprofile':
    //     requestParams.type = 'POST'
    //     break
    //   case 'updateprofile':
    //     requestParams.type = 'PATCH'
    //     break
    //   case 'deleteprofile':
    //     requestParams.type = 'DELETE'
    //     break
    //   default:
    //     $('#doneStatus').append('Unsupported operation')
    //     return
    // }

    // $.ajax(requestParams)
    //   .done((data) => {
    //     // $('#nickname').val('Choose...')
    //     // $('#newNickname').val('')
    //     // $('#type').val('Choose...')
    //     // $('#profileBrand').val('')
    //     // $('#model').val('')
    //     // $('#doneStatus').append(`profile ${newNickname} successfully added`)
    //
    //     console.log("about to reload")
    //     window.location.href = '/profile'
    //     // location.reload()
    //     console.log("reloaded")
    //   })
      // .fail(($xhr) => {
      //   console.log("failed", $xhr)
      //   $('#doneStatus').append(`Error adding a profile`)
      // });
  })
}

// const setButtons = (add, edit) => {
//   $('#edit-profile').prop('enabled', !edit)
// }

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
