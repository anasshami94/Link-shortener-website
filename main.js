const generatedUrlEl = document.getElementById("generated-url-container")
const generatedURLSpan = document.getElementById("generated-url")
const generationInput = document.querySelector(".input-container > #url-input")
const generationButton = document.querySelector(".input-container > button")
const loading = document.getElementById("loading")
// handlers
const enableButton = (value) => {
    const isDisabled = !value.match(/.+\..+/g)
    if(isDisabled) {
        generationButton.setAttribute("disabled", true)
    } else {
        generationButton.removeAttribute("disabled")
    }
}

const generate = async () => {
    loading.style.display="block"
    const response = await fetch(`https://api.tinyurl.com/create?api_token=vCwwhYrLSC0Vd2TdFH5HgTA2MU8a5twKj41aPB42UyWhWCBGz2r7cIPQOn99`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            url: generationInput.value
        })
    })
    const {data = {}} = await response.json()
    if(data.tiny_url) {
        generatedURLSpan.innerHTML = `<a href="${data.tiny_url}">${data.tiny_url}</a>`
    } else {
        generatedURLSpan.innerHTML = "Error !"
    }
    generatedUrlEl.style.display = "block"
    loading.style.display="none"
}