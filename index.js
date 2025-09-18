import { catsData } from "./data.js"

// Initial variables
const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnly = document.getElementById("gifs-only-option")

// Event Listeners
emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", getMatchingCatsArray)

//function that checks for checked radio buttons and returns matching cats
function getMatchingCatsArray() {
  const checkedRadios = document.querySelector('input[name="emotions"]:checked')
  if (checkedRadios) {
    const selectedEmotion = checkedRadios.value
    const isGif = gifsOnly.checked
    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
      } else {
        return cat.emotionTags.includes(selectedEmotion)
      }
    })
    return matchingCatsArray
  }
}

//function that removes the hightlight class after a change is detected and enables it on the newly selected radio
function highlightCheckedOption(e) {
  const emotionsArray = document.getElementsByClassName("radio")
  for (let emotion of emotionsArray) {
    emotion.classList.remove("highlight")
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

// function that gets each emotion from catsData
function getEmotionsArray(cats) {
  const emotionsArray = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion)
      }
    }
  }
  return emotionsArray
}

// function that renders the emotions in the front-end
function renderEmotionsRadios(cats) {
  let emotionText = ``
  const emotions = getEmotionsArray(cats)
  for (let emotion of emotions) {
    emotionText += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
  }
  emotionRadios.innerHTML = emotionText
}
renderEmotionsRadios(catsData)
