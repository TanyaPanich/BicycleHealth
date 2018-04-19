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

    const bikeName = $('#nickname-of-bike').val()

    if(bikeName == 'Choose...'){
      alert('Please choose a default bike')
      return false
    }

    localStorage.setItem('favBike', JSON.stringify(bikeName))
    console.log("Default Bike:", bikeName)


  })

}
