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
      const partOpt = $('partName')
      console.log('partOpt', partOpt)
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

    const bikeName = $('#bicycleNickname').val()
    const partName = $('#partName').val().split(" ")[0]
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
      $('#bikeNameStatus').css('display', 'inline')
      $('#bikeNameStatus').append('Please choose from a list...')
      return
    }

    if (!partName || partName === 'Choose...') {
      $('#partNameStatus').css('display', 'inline')
      $('#partNameStatus').append('Please choose from a list...')
      return
    }

    if (!partBrand) {
      $('#partBrandStatus').css('display', 'inline')
      $('#partBrandStatus').append('Brand must not be blank')
      return
    }

    if (!partModel) {
      $('#partModelStatus').css('display', 'inline')
      $('#partModelStatus').append('Model must not be blank')
      return
    }

    const bikeParts = bikes[bikeName].parts
    let partId = partName in bikeParts ? bikeParts[partName].id : ''

    let requestParams = {
      data: {
        partId,
        bikeName,
        partName,
        partBrand,
        partModel,
        maxLifeSpan,
        estMileage
      },
      url: '/part'
    }
    if(partName === 'Wheel' && event.currentTarget.id === 'deletePart') {
      event.preventDefault()
      $('#partNameStatus').css('display', 'inline')
      $('#partNameStatus').append('Really?! How you gonna ride without wheel?')
      return
    } else {
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
    }
    //let status = $('#donePartStatus')
    $.ajax(requestParams)
      .done((data) => {
        console.log('dataaaaa', data)
        window.location.href = '/part'
      })
      .fail(($xhr) => {
        console.log('Error getting data')
        // $('#donePartStatus').css({
        //   'color': 'red'
        // })
        // $('#donePartStatus').append(`Part already exists`)
      });
  })

}


const addPartNameSelectListener = (bikes) => {
  $('#partName').change(function() {
    updateForm(bikes, $('#bicycleNickname').val(), $(this).val())
  })
}
const addBikeNameSelectListener = (bikes) => {
  $('#bicycleNickname').change(function() {
    updateForm(bikes, $(this).val(), $('#partName').val())
    updatePartSelector(bikes, $(this).val())
  })
}
const updatePartSelector = (bikes, bikeName) => {
  const bikeSelected = bikeName in bikes
  console.log("bikeSelected:", bikeSelected)
  $('#partName').prop('disabled', !bikeSelected)
  if (!bikeSelected) {
    return
  }
  $('#partName option').each((index, element) => {
    const partName = element.innerText.split(" ")[0]
    if (partName === "Choose...") {
      return
    }
    const bikeParts = bikes[bikeName].parts
    if (partName in bikeParts) {
      element.innerText = partName + " \u2714"
    } else {
      element.innerText = partName
    }
    console.log("option:", element.innerText)
  })
}

const updateForm = (bikes, bikeName, partName) => {
  partName = partName.split(" ")[0]
  console.log('bikeName', bikeName)
  console.log('partName', partName)
  if (bikeName === "Choose..." || partName == 'Choose...') {
    $('#partNameStatus').empty()
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

// console.log('lalalalal', bikeParts)
// $('#partName').append(`<option
// >${bikeParts}</option>`)
