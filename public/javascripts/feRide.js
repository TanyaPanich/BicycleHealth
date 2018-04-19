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
      let method = 'GET'
      /* eslint-disable */
      switch (event.currentTarget.id) {
        case 'addRide':
          method = 'POST'
          break
        case 'updateRide':
          method = 'PATCH'
          break
        case 'deleteRide':
          method = 'DELETE'
          break
        default:
          $('#doneStatus').append('Unsupported operation')
          return
      }
      /* eslint-enable */

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
      if (method === 'POST') {
        if (!rideName || rideName === 'Choose...') {
          $('#nameStatus').append('Please select a Ride or New')
          return
        }
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
      let oldDistance = '0'
      if (rideName === 'New') {
        name = newRideName
      }
      else {
        name = rideName
        rideId = $('#ride-name').find(':selected').data('id')
        oldDistance = $('#ride-name').find(':selected').data('old-distance')
      }

      let requestParams = {
        data: {
          bikeid,
          rideId,
          name,
          date,
          distance,
          oldDistance,
          weather,
          road
        },
        url: '/ride'
      }
      requestParams.type = method
      $.ajax(requestParams)
        .done((data) => {
          window.location.href = '/ride'
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
      let bikeid = null
      if (bikename in bikes) {
        bikeid = bikes[bikename].id
        // console.log('bikename', bikename, 'is in bikes')
        // console.log('bikeid', bikeid)
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
              data.rides.forEach((ele, index) => {
                const ride = ele.ride
                const conditions = ele.condition
                const weathers = conditions.filter((cond) => cond.type === 'weather')
                let weather = ''
                if (weathers.length > 0) {
                  weather = weathers[0].condition
                }
                let road = ''
                const roads = conditions.filter((cond) => cond.type === 'road')
                if (roads.length > 0) {
                  road = roads[0].condition
                }
                $('#ride-name').append(`<option data-id="${ride.id}"
                data-name="${ride.name}" data-old-distance="${ride.distance}"
                data-distance="${ride.distance}" data-date="${ride.rode_at}"
                data-weather="${weather}" data-road="${road}"
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
      const name = $('#ride-name').val().trim()
      if (name !== 'New') {
        $('#addRide').prop('disabled', true )
        $('#updateRide').prop('disabled', false )
        $('#deleteRide').prop('disabled', false )
        $('#new-ride-name').prop('disabled', true )
        $('#road-condition').prop('disabled', true )
        $('#weather-condition').prop('disabled', true )
        const distance = $('#ride-name').find(':selected').data('distance')
        const dateString = $('#ride-name').find(':selected').data('date')
        const date = new Date(dateString)
        const weather = $('#ride-name').find(':selected').data('weather')
        const road = $('#ride-name').find(':selected').data('road')
        $('#ride-date').val(`${convertDateToString(date)}`)
        $('#ride-distance').val(distance)
        $('#weather-condition').val(weather)
        $('#road-condition').val(road)
      }
      else {
        const date = new Date()
        $('#ride-date').val(`${convertDateToString(date)}`)
        $('#addRide').prop('disabled', false )
        $('#updateRide').prop('disabled', true )
        $('#deleteRide').prop('disabled', true )
        $('#new-ride-name').prop('disabled', false )
        $('#road-condition').prop('disabled', false )
        $('#weather-condition').prop('disabled', false )
      }
    })
  }

  function convertDateToString(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = (date.getDate()).toString().padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
  }
})
