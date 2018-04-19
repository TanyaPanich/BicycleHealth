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
      addBikeSelectListener(data.bikes)
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
      $('#nameStatus').empty()
      $('#newNameStatus').empty()

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
      const rideName = $('#ride-name').val().trim()
      const newRideName = $('#new-ride-name').val().trim()
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
      if (!rideName || rideName === 'Choose...') {
        $('#nameStatus').append('Please select a Ride or New')
        return
      }
      if (rideName === 'New' && !newRideName) {
        $('#newNameStatus').append('Please enter ride name')
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

      let name = ''
      let rideId = ''
      if (rideName === 'New') {
        name = newRideName
      }
      else {
        name = rideName
        rideId = $('#ride-name').find(':selected').data('id')
      }

      let requestParams = {
        data: {
          bikeid,
          rideId,
          name,
          date,
          distance,
          weather,
          road
        },
        url: '/ride'
      }
      /* eslint-disable */
      switch (event.currentTarget.id) {
        case 'addRide':
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

  function addBikeSelectListener(bikes) {
    $('#bike-used').change(() => {
      const bikename = $('#bike-used').val()
      console.log('bikename', bikename)
      let bikeid = null
      if (bikename in bikes) {
        bikeid = bikes[bikename].id
        console.log('bikename', bikename, 'is in bikes')
        console.log('bikeid', bikeid)
        $.ajax({
          url: `/ride/for/${bikeid}`,
          type: 'GET',
          dataType: 'json',
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          },
          success: (data) => {
            console.log('data success', data)
            if (data.rides) {
              data.rides.forEach((ride, index) => {
                $('#ride-name').append(`<option data-id="${ride.id}" data-name="${ride.name}"
                data-distance="${ride.distance}" data-date="${ride.rode_at}"
                >${ride.name}</option>`)
              })
              addRideSelectListener()
            }
          },
          error: (err) => {
            console.log('err', err)
          }
        })
      }
      else {
        $('#bikeStatus').append('A bicycle must be selected')
      }
    })
  }

  function addRideSelectListener() {
    $('#ride-name').change(() => {
      const name = $('#ride-name').find(':selected').data('name')
      const distance = $('#ride-name').find(':selected').data('distance')
      const dateString = $('#ride-name').find(':selected').data('date')
      const date = new Date(dateString)
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')
      $('#ride-date').val(`${date.getFullYear()}-${month}-${day}`)
      $('#ride-distance').val(distance)
      // const weather = $('#weather-condition').val().trim()
      // const road = $('#road-condition').val().trim()
    })
  }
})
