$(document).ready(() => {
  console.log('FE document bike ready')
  $.ajax({
    url: '/bike',
    type: 'GET',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    //data: JSON.stringify({}),
    success: (data) => {
      console.log('data success', data)
      addFormSubmitListener(data.bikes)
      addNicknameSelectListener(data.bikes)
    },
    //   $('#server-status').text(data.status)
    // },
    error: (err) => {
      console.log('err', err)
      // $('#server-status').text(err.responseJSON.status)
    }
  })
})

const addNicknameSelectListener = (bikes) => {
  $('#nickname').change(function() {
    const value = $(this).val()
    console.log('value', value)
    if (value in bikes) {
      console.log('value', value, 'is in bikes')
      $('#newNickname').val('')
      $('#type').val(bikes[value].type)
      $('#bikeBrand').val(bikes[value].brand)
      $('#model').val(bikes[value].model)
    } else if (['New', 'Choose...'].includes(value)) {
      console.log('value', value, 'is new or unset')
      $('#type').val('Choose...')
      $('#bikeBrand').val('')
      $('#model').val('')
    } else {
      console.log('invalid value', value)
    }
  })
}

const addFormSubmitListener = (bikes) => {
  $('.bike-buttons').click((event) => {
    console.log("event:", event)
    event.preventDefault()
    $('#newNicknameStatus').empty()
    $('#typeStatus').empty()
    $('#brandStatus').empty()
    $('#modelStatus').empty()
    $('#doneStatus').empty()

    let nickname = ''
    let bikeid = ''
    let strava_gear_id = ''
    let distance = ''
    let distance_unit = ''

    const nicknameSelector = $('#nickname').val()
    if (nicknameSelector in bikes) {
      if (event.currentTarget.id === 'addBike') {
        $('#doneStatus').append('This operation is not supported for existing bike')
        return
      }
      nickname = nicknameSelector
      bikeid = bikes[nickname].id
      strava_gear_id = bikes[nickname].strava_gear_id
      distance = bikes[nickname].distance
      distance_unit = bikes[nickname].distance_unit
    } else if (nicknameSelector == 'New') {
      if (event.currentTarget.id !== 'addBike') {
        $('#doneStatus').append('This operation is not supported for new bike')
        return
      }
      nickname = $('#newNickname').val().trim()
    } else {
      $('#newNicknameStatus').append('Please select valid nickname option')
      return
    }

    const type = $('#type').val().trim()
    const brand = $('#bikeBrand').val().trim()
    const model = $('#model').val().trim()

    console.log("nickname:", nickname)
    console.log("type:", type)
    console.log("brand:", brand)
    console.log("model:", model)

    if (!nickname) {
      $('#newNicknameStatus').append('Nickname must not be blank')
      return
    }

    if (!type || type === 'Choose...') {
      $('#typeStatus').append('Please choose a type')
      return
    }

    if (!brand) {
      $('#brandStatus').append('Brand must not be blank')
      return
    }

    if (!model) {
      $('#modelStatus').append('Model must not be blank')
      return
    }

    let requestParams = {
      data: {
        nickname,
        type,
        brand,
        model,
        bikeid,
        strava_gear_id,
        distance,
        distance_unit
      },
      url: '/bike'
    }
    switch (event.currentTarget.id) {
      case 'addBike':
        requestParams.type = 'POST'
        break
      case 'updateBike':
        requestParams.type = 'PATCH'
        break
      case 'deleteBike':
        requestParams.type = 'DELETE'
        break
      default:
        $('#doneStatus').append('Unsupported operation')
        return
    }

    $.ajax(requestParams)
      .done((data) => {
        // $('#nickname').val('Choose...')
        // $('#newNickname').val('')
        // $('#type').val('Choose...')
        // $('#bikeBrand').val('')
        // $('#model').val('')
        // $('#doneStatus').append(`Bike ${newNickname} successfully added`)
        console.log("about to reload")
        location.reload()
        console.log("reloaded")
      })
      .fail(($xhr) => {
        console.log("failed", $xhr)
        $('#doneStatus').append(`Error adding a bike`)
      });
  })
}
