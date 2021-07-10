const cards = document.querySelectorAll('.card')
let hashFlipperCard = false
let firstCard, secondCard
let lockBoard = false

function flipCard(){

    if(lockBoard) return
    if(this === firstCard) return
    this.classList.add('flip')
    if(!hashFlipperCard){
        hashFlipperCard = true
        firstCard = this
        return
    }
    secondCard = this
    hashFlipperCard = false
    checkForMath()
}

function checkForMath(){

    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return
    }
    unflipCard()
}

function disableCards(){

    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}
function unflipCard(){

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    },1500) 
    
}

function resetBoard(){

    [hashFlipperCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){

    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
