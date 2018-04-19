$(document).ready(() => {
  console.log('FE document Part ready')
  setButtons(false, false)
  $.ajax({
    url: '/setting',
    type: 'GET',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: (data) => {
      console.log('data success', data)
      addFormSubmitListener(data.bikes)
    },
    error: (err) => {
      console.log('err', err)
    }
  })
})

const setButtons = (add, edit) => {
  $('#edit-settings').prop('disabled', add)
}

const addFormSubmitListener = (bikes) => {
  $('#edit-settings').click((event) => {
    console.log("event:", event)
    event.preventDefault()
    // $('#edit-settings').empty()

    const bikeName = $('#nickname-of-bike').val()

    if(bikeName == 'Choose...'){
      alert('Please choose a default bike')
      return false
    }

    localStorage.setItem('favBike', JSON.stringify(bikeName))
    console.log("Default Bike:", bikeName)



    //let status = $('#donePartStatus')
    //
    // $.ajax(requestParams)
    //   .done((data) => {
    //     console.log('dataaaaa', data)
    //     window.location.href = '/part'
    //
    //     // $('#bicycleNickname').val('Choose...')
    //     // $('#partName').val('Choose...')
    //     // updateInputFields()
    //     // $('#donePartStatus').css({
    //     //   'color': 'green'
    //     // })
    //     // fadeInOut($('#donePartStatus').append(data.message))
    //   })
    //   .fail(($xhr) => {
    //     $('#donePartStatus').css({
    //       'color': 'red'
    //     })
    //     $('#donePartStatus').append(`Part already exists`)
    //   });
  })

}
//
// function fadeInOut(p) {
//   $(p).fadeIn(500, () => {
//     setTimeout(() => {
//       $(p).fadeOut(500)
//     }, 3000)
//   })
// }
//
// const addPartNameSelectListener = (bikes) => {
//   $('#partName').change(function() {
//     updateForm(bikes, $('#bicycleNickname').val(), $(this).val())
//   })
// }
// const addBikeNameSelectListener = (bikes) => {
//   $('#bicycleNickname').change(function() {
//     updateForm(bikes, $(this).val(), $('#partName').val())
//   })
// }
//
// const updateForm = (bikes, bikeName, partName) => {
//   console.log('bikeName', bikeName)
//   console.log('partName', partName)
//   if (bikeName === "Choose..." || partName == 'Choose...') {
//     setButtons(false, false)
//     updateInputFields()
//     return
//   }
//
//   const bikeParts = bikes[bikeName].parts
//   if (partName in bikeParts) {
//     const part = bikeParts[partName]
//     setButtons(false, true)
//     updateInputFields(part)
//   } else {
//     // this is new part.
//     setButtons(true, false)
//     updateInputFields()
//   }
// }
//
// const updateInputFields = (part) => {
//   if (part) {
//     $('#partBrand').val(part.brand)
//     $('#partModel').val(part.model)
//     $('#maxLifeSpan').val(part.max_life_span)
//     $('#estMileage').val(part.distance)
//   } else {
//     $('#partBrand').val('')
//     $('#partModel').val('')
//     $('#maxLifeSpan').val('')
//     $('#estMileage').val('')
//   }
// }
