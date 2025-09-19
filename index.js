import { catsData } from "./data.js"

// Initial variables
const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnly = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

// Event Listeners
emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener("click", renderCat)

// function that closes the memeModal
memeModalCloseBtn.addEventListener("click", function(){
  memeModal.style.display = 'none'
})


//function that checks for checked radio buttons and returns an array of cat objects that matches
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

// function that will return a single cat object selected from the getMatchingCatsArray
function getSingleCatObject() {
  const catsArray = getMatchingCatsArray()
  if(catsArray.length === 1) {
    return catsArray[0]
  } else {
    const randomNum = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomNum]
  }
}


// function that uses the cat object provided by getSingleCatObject to create HTML string that renders in the DOM
function renderCat() {
  const catObject = getSingleCatObject()
  memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
  memeModal.style.display = 'flex'
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
