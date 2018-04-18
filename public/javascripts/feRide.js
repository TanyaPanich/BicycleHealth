$(document).ready(() => {
  console.log('FE document ride ready')
  $.ajax({
    url: '/ride',
    type: 'GET',
    dataType: 'json',
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    success: (data) => {
      console.log('data success', data)
      addFormSubmitListener(data.bikes)
    },
    error: (err) => {
      console.log('err', err)
    }
  })

  function addFormSubmitListener(bikes) {
    $('.ride-buttons').click((event) => {
      console.log("event:", event)
      event.preventDefault()
      $('#newNicknameStatus').empty()
      $('#typeStatus').empty()
      $('#brandStatus').empty()
      $('#modelStatus').empty()
      $('#road-condition').empty()

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
        if (event.currentTarget.id === 'updateBike') {
          nickname = $('#newNickname').val().trim()
        }
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
          debugger
          console.log("about to reload")
          window.location.href = '/bike'
          // location.reload()
          console.log("reloaded")
        })
        .fail(($xhr) => {
          console.log("failed", $xhr)
          $('#doneStatus').append(`Error adding a bike`)
        });
    })
  }
})
