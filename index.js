import { catsData } from "./data.js"
// Initial variables 
const emotionRadios = document.getElementById('emotion-radios')

// function that gets each emotion from catsData
function getEmotionsArray(cats){
    const emotionsArray = []
    for(let cat of cats) {
        for(let emotion of cat.emotionTags) {
            emotionsArray.push(emotion)
    }  
   }
   return emotionsArray
}

// function that renders the emotions in the front-end
function renderEmotionsRadios(cats) {
    let emotionText = ``
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions) {
        emotionText += `<p>${emotion}</p>`
    }
    emotionRadios.innerHTML = emotionText
}
renderEmotionsRadios(catsData)