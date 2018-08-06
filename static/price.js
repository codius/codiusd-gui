;(function () {
  const priceField = document.getElementById('price')
  const statusField = document.getElementById('requestStatus')

  window.updatePrice = async function (event) {
    event.preventDefault()

    try {
      const res = await fetch('/actions/price', {
        method: 'POST',
        body: JSON.stringify({
          price: priceField.value
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('RESP:')
      console.log(res)
      statusField.innerHTML = 'Success!'
      return res
    } catch (e) {
      console.log(e)
      statusField.innerHTML = e
    }
  }
})()