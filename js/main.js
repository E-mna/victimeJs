const els = {
    score: null,
    answer: null,
    choices: null
};

 
let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 8;


const init = () => {
    // console.log('>> #init');

    // attacher les elements
    els.score = document.querySelector('#score');
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');

  
     // définir les evenements 
     //choisie un mot 
    word = pickWord();
    // console.log('word', word);
     // creer map mot
    wordMapping = getWordMapping(word);
    console.log('wordMapping', wordMapping);
    // Generate choices
    choices = generateChoices();
    // console.log(choices);
    //  - creaerr choix map
    choicesMapping = getChoicesMapping(choices);
    // console.log(choicesMapping);
      // reférencer la lettre
    displayWord(wordMapping);
    // reférencer le choix
    displayChoices(choicesMapping);
    // Display score
    // displayScore();
    // Listen events
    //    - mouse events
    els.choices.addEventListener('click', ({ target }) => {
        // evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        } 
    });
    //     - souris event
    document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        // console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
        // console.log('letter', letter);
        if (keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter);
        }
    });


};

     // verifier la lettre
     // - if elle ne fait pas partie: add score
     // - if elle fait parti du mot : affiche la lettre
     // - fin de jeu:
     //        . if score == max : Mourir
     //        . if decouvrire toute les lettre : Sauvé
const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
    // console.log('isLetterWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        // console.log('letterMapping.letter', letterMapping.letter);
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });
    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }
    });
    displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else {
        scoreCount++;
        displayScore();
    }

    if (scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
    // console.log('isLetterWord after loop', isLetterInWord);
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
  //  document.querySelector('body').style.backgroundColor = 'red';
    els.choices.innerHTML = `<h1>C'est JavaSript qui t'as pendu</h1>`;
};
const winGame = () => {
    els.choices.innerHTML = `<h1>Sauvé par un génie </h1>`;
}


window.addEventListener('load', () => {
    init();
});
 


 // On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
//function getRandomInt (min, max) {
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}