$(document).ready(() => {
  console.log('FE document Part ready')
  setButtons(false, false)
  $.ajax({
    url: '/part',
    type: 'GET',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: (data) => {
      console.log('data success', data)
      addFormSubmitListener(data.bikes)
      addPartNameSelectListener(data.bikes)
      addBikeNameSelectListener(data.bikes)
    },
    error: (err) => {
      console.log('err', err)
    }
  })
})

const setButtons = (add, edit) => {
  $('#addPart').prop('disabled', !add)
  $('#updatePart').prop('disabled', !edit)
  $('#deletePart').prop('disabled', !edit)
}

const addFormSubmitListener = (bikes) => {
  $('.part-buttons').click((event) => {
    console.log("event:", event)
    event.preventDefault()
    $('#bikeNameStatus').empty()
    $('#partNameStatus').empty()
    $('#partBrandStatus').empty()
    $('#partModelStatus').empty()
    $('#donePartStatus').empty()

    // let bikeName = ''
    // let partName = ''
    // let partBrand = ''
    // let distance = ''
    // let partModel = ''
    // let minLifeSpan
    // let estMileage

    // const bikeNameSelector = $('#bicycleNickname').val()
    // if (bikeNameSelector in bikes) {
    // if (event.currentTarget.id === 'addBike') {
    //   $('#doneStatus').append('This operation is not supported for existing bike')
    //   return
    // }
    // nickname = nicknameSelector
    // bikeid = bikes[nickname].id
    // strava_gear_id = bikes[nickname].strava_gear_id
    // distance = bikes[nickname].distance
    // distance_unit = bikes[nickname].distance_unit

    // } else if (nicknameSelector == 'New') {
    //   if (event.currentTarget.id !== 'addBike') {
    //     $('#doneStatus').append('This operation is not supported for new bike')
    //     return
    //   }
    //   nickname = $('#newNickname').val().trim()
    // } else {
    //   $('#newNicknameStatus').append('Please select valid nickname option')
    //   return
    // }
    const bikeName = $('#bicycleNickname').val()
    const partName = $('#partName').val()
    const partBrand = $('#partBrand').val().trim()
    const partModel = $('#partModel').val().trim()
    const maxLifeSpan = $('#maxLifeSpan').val().trim()
    const estMileage = $('#estMileage').val().trim()

    console.log("bikeName:", bikeName)
    console.log("partName:", partName)
    console.log("partBrand:", partBrand)
    console.log("partModel:", partModel)
    console.log("maxLifeSpan:", maxLifeSpan)
    console.log("estMileage:", estMileage)

    if (!bikeName) {
      $('#bikeNameStatus').append('Please choose from a list...')
      return
    }

    if (!partName || partName === 'Choose...') {
      $('#partNameStatus').append('Please choose from a list...')
      return
    }

    if (!partBrand) {
      $('#partBrandStatus').append('Brand must not be blank')
      return
    }

    if (!partModel) {
      $('#partModelStatus').append('Model must not be blank')
      return
    }

    let requestParams = {
      data: {
        bikeName,
        partName,
        partBrand,
        partModel,
        maxLifeSpan,
        estMileage
      },
      url: '/part'
    }
    switch (event.currentTarget.id) {
      case 'addPart':
        requestParams.type = 'POST'
        break
      case 'updatePart':
        requestParams.type = 'PATCH'
        break
      case 'deletePart':
        requestParams.type = 'DELETE'
        break
      default:
        $('#donePartStatus').append('Unsupported operation')
        return
    }
    //let status = $('#donePartStatus')

    $.ajax(requestParams)
      .done((data) => {
        console.log('dataaaaa', data)
        $('#bicycleNickname').val('Choose...')
        $('#partName').val('Choose...')
        $('#partBrand').empty()
        $('#partModel').empty()
        $('#maxLifeSpan').empty()
        $('#estMileage').empty()
        $('#donePartStatus').css({
          'color': 'green'
        })
        fadeInOut($('#donePartStatus').append(data.message))
      })
      .fail(($xhr) => {
        $('#donePartStatus').css({
          'color': 'red'
        })
        $('#donePartStatus').append(`Part already exists`)
      });
  })

}

function fadeInOut(p) {
  $(p).fadeIn(500, () => {
    setTimeout(() => {
      $(p).fadeOut(500)
    }, 3000)
  })
}
// const addNicknameSelectListener = (bikes) => {
//   $('#bicycleNickname').change(function() {
//     const value = $(this).val()
//     console.log('value', value)
//     if (value in bikes) {
//       console.log('value', value, 'is in bikes')
// $('#newNickname').val('')
// $('#type').val(bikes[value].type)
// $('#bikeBrand').val(bikes[value].brand)
// $('#model').val(bikes[value].model)
//>>>>>>>>>>>>> I STOPPED HERE!!!
// } else if (['Choose...'].includes(value)) {
//   console.log('value', value, 'is new or unset')
//   $('#type').val('Choose...')
//   $('#partName').val('')
//   $('#model').val('')
// } else {
//   console.log('invalid value', value)
//      }
//   })
// }

const addPartNameSelectListener = (bikes) => {
  $('#partName').change(function() {
    updateForm(bikes, $('#bicycleNickname').val(), $(this).val())
  })
}
const addBikeNameSelectListener = (bikes) => {
  $('#bicycleNickname').change(function() {
    updateForm(bikes, $(this).val(), $('#partName').val())
  })
}

const updateForm = (bikes, bikeName, partName) => {
  console.log('bikeName', bikeName)
  console.log('partName', partName)
  if (bikeName === "Choose..." || partName == 'Choose...') {
    setButtons(false, false)
    updateInputFields()
    return
  }

  const bikeParts = bikes[bikeName].parts
  if (partName in bikeParts) {
    const part = bikeParts[partName]
    setButtons(false, true)
    updateInputFields(part)
  } else {
    // this is new part.
    setButtons(true, false)
    updateInputFields()
  }
}

const updateInputFields = (part) => {
  if (part) {
    $('#partBrand').val(part.brand)
    $('#partModel').val(part.model)
    $('#maxLifeSpan').val(part.max_life_span)
    $('#estMileage').val(part.distance)
  } else {
    $('#partBrand').val('')
    $('#partModel').val('')
    $('#maxLifeSpan').val('')
    $('#estMileage').val('')
  }
}
