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
      event.preventDefault()
      $('#dateStatus').empty()
      $('#bikeStatus').empty()
      $('#distanceStatus').empty()
      $('#weatherStatus').empty()
      $('#roadStatus').empty()

      let bikename = ''
      let bikeid = ''

      const bikeSelector = $('#bike-used').val()
      if (bikeSelector in bikes) {
        bikename = bikeSelector
        bikeid = bikes[bikename].id
      }
      if (!bikename) {
        $('#bikeStatus').append('A bicycle must be selected')
        return
      }

      const date = $('#ride-date').val().trim()
      const distance = $('#ride-distance').val().trim()
      const weather = $('#weather-condition').val().trim()
      const road = $('#road-condition').val().trim()
      //
      // console.log('bikename:', bikename)
      // console.log('date:', date)
      // console.log('distance:', distance)
      // console.log('weather:', weather)
      // console.log('road:', road)

      if (!date) {
        $('#dateStatus').append('Please select a date')
        return
      }
      if (!distance) {
        $('#distanceStatus').append('Please enter the distance')
        return
      }
      if (!weather || weather === 'Choose...') {
        $('#weatherStatus').append('Please choose a weather condition')
        return
      }
      if (!road || road === 'Choose...') {
        $('#roadStatus').append('Please choose a road condition')
        return
      }

      let requestParams = {
        data: {
          bikeid,
          date,
          distance,
          weather,
          road
        },
        url: '/ride'
      }
      debugger
      /* eslint-disable */
      switch (event.currentTarget.id) {
        case 'addRide':
          requestParams.type = 'POST'
          break
        // case 'updateBike':
        //   requestParams.type = 'PATCH'
        //   break
        // case 'deleteBike':
        //   requestParams.type = 'DELETE'
        //   break
        default:
          $('#doneStatus').append('Unsupported operation')
          return
      }
      /* eslint-enable */

      $.ajax(requestParams)
        .done((data) => {
          console.log('about to reload')
          window.location.href = '/ride'
          // location.reload()
          console.log('reloaded')
        })
        .fail(($xhr) => {
          console.log('failed', $xhr)
          $('#doneStatus').append(`Error adding a ride`)
        })
    })
  }
})
