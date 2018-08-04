;(function () {
  const priceField = document.getElementById('price')

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
    } catch (e) {
      console.log(e)
    }
  }
})()