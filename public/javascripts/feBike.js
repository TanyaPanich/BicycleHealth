$(document).ready(() => {
  console.log('FE document bike ready')
  setButtons(false, false)
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
    error: (err) => {
      console.log('err', err)
    }
  })
})

const addNicknameSelectListener = (bikes) => {
  $('#nickname').change(function() {
    const value = $(this).val()
    console.log('value', value)
    if (value in bikes) {
      console.log('value', value, 'is in bikes')
      setButtons(false, true)
      updateInputFields(bikes[value])
      $('#newNickname').val('')
    } else if (['New', 'Choose...'].includes(value)) {
      console.log('value', value, 'is new or unset')
      setButtons(value === "New", false)
      updateInputFields()
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
      // if (event.currentTarget.id === 'addBike') {
      //   $('#doneStatus').append('This operation is not supported for existing bike')
      //   return
      // }
      nickname = nicknameSelector

      bikeid = bikes[nickname].id
      strava_gear_id = bikes[nickname].strava_gear_id
      distance = bikes[nickname].distance
      distance_unit = bikes[nickname].distance_unit
      if (event.currentTarget.id === 'updateBike') {
        nickname = $('#nickname').val().trim()
      }
    } else if (nicknameSelector == 'New') {
      // if (event.currentTarget.id !== 'addBike') {
      //   $('#doneStatus').append('This operation is not supported for new bike')
      //   return
      // }
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
      $('#newNicknameStatus').css('display', 'inline')
      $('#newNicknameStatus').append('Nickname must not be blank')
      return
    }

    if (!type || type === 'Choose...') {
      $('#typeStatus').css('display', 'inline')
      $('#typeStatus').append('Please choose a type')
      return
    }

    if (!brand) {
      $('#brandStatus').css('display', 'inline')
      $('#brandStatus').append('Brand must not be blank')
      return
    }

    if (!model) {
      $('#modelStatus').css('display', 'inline')
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
    }

    $.ajax(requestParams)
      .done((data) => {
        window.location.href = '/bike'
      })
      .fail(($xhr) => {
        console.log('Error adding a bike')
      });
  })
}

const setButtons = (add, edit) => {
  $('#newNickname').prop('disabled', !add)
  $('#addBike').prop('disabled', !add)
  $('#updateBike').prop('disabled', !edit)
  $('#deleteBike').prop('disabled', !edit)
}

const updateInputFields = (bike) => {
  if (bike) {
    $('#type').val(bike.type)
    $('#bikeBrand').val(bike.brand)
    $('#model').val(bike.model)
  } else {
    $('#type').val('Choose...')
    $('#bikeBrand').val('')
    $('#model').val('')
  }
}
