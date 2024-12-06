let score = 0; 
let scoreRotation = 0; 
let nbClic = 0;
let multiplicateur = 1;
let prixMulti = 20;
let passif = 0;
let prixPassif = 50;
let prixGoal = 1000;
let ProbaShop = 0;
let malusActive = false; 
let malusTimer; 

const scoreDisplay = document.querySelector('#score h2 span');
const clickerImage = document.querySelector('#clickerImage'); 
const nbClicDisplay = document.querySelector('#stat #statNbClic span');
const multiDisplay = document.querySelector('#shop #shopmulti p span');
const multiStatDisplay = document.querySelector('#stat #statmulti span');
const passifDisplay = document.querySelector('#shop #shopauto span');
const STpsDisplay = document.querySelector('#score h3 span');
const bonusElement = document.querySelector('#bonus');
const bonusImage = document.querySelector('#bonusImage');
const prixMultiDisplay = document.querySelector('#shop #shopmulti p buy_m span');
const prixPassifDisplay = document.querySelector('#shop #shopauto p buy_p span');


function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

clickerImage.addEventListener('click', () => {
  score = score + (1 * multiplicateur);
  scoreDisplay.textContent = score;

  scoreRotation += 30; 
  scoreDisplay.style.transform = `rotate(${scoreRotation}deg)`; 
  scoreDisplay.style.transition = 'transform 0.3s ease';

  const randomX = getRandomPosition(0, 800); 
  const randomY = getRandomPosition(0, 400); 
  clickerImage.style.position = 'absolute'; 
  clickerImage.style.left = `${randomX}px`; 
  clickerImage.style.top = `${randomY}px`; 
  nbClicDisplay.textContent = nbClic;
  nbClic++
});

clickerImage.addEventListener('click', () => {
  clickerImage.classList.add('clicked');

  setTimeout(() => {
    clickerImage.classList.remove('clicked');
  }, 300);
});

piege.addEventListener('click', () => {
  score = 0;  
  scoreRotation = 0;
  nbClic = 0;
  multiplicateur = 1;
  passif = 0;
  prixMulti = 20;
  prixPassif = 50;
  prixGoal = 1000;
  passifDisplay.textContent = passif;
  STpsDisplay.textContent = passif;
  nbClicDisplay.textContent = nbClic;
  multiDisplay.textContent = multiplicateur;
  multiStatDisplay.textContent = multiplicateur;
  alert('Oups ! Mauvais endroit...');
});

function Passif (){
  score = score + (1*passif);
  scoreDisplay.textContent = score;
}
setInterval(Passif, 1000);

buy_m.addEventListener('click', () => {
  if (score >= prixMulti) {
    ProbaShop = Math.floor(Math.random() * 3) + 1;
    if (ProbaShop == 1) {
      multiplicateur = (multiplicateur + 1)/10;
      multiDisplay.textContent = multiplicateur;
      multiStatDisplay.textContent = multiplicateur;
      score = score - prixMulti;
      prixMulti = prixMulti * 2;
      scoreDisplay.textContent = score;
      prixMultiDisplay.textContent = prixMulti;
    }
    else {
      multiplicateur++
      multiDisplay.textContent = multiplicateur;
      multiStatDisplay.textContent = multiplicateur;
      score = score - prixMulti;
      prixMulti = prixMulti * 2;
      scoreDisplay.textContent = score;
      prixMultiDisplay.textContent = prixMulti;
    }
  }
});

buy_p.addEventListener('click', () => {
  if (score >= prixPassif) {
    passif = passif + 1
    passifDisplay.textContent = passif;
    STpsDisplay.textContent = passif;
    score = score - prixPassif;
    prixPassif = prixPassif * 2;
    scoreDisplay.textContent = score;
    prixPassifDisplay.textContent = prixPassif;
  }
});

buy_g.addEventListener('click', () => {
  if (score >= prixGoal) {
    score = 0;
    scoreRotation = 0;
    nbClic = 0;
    multiplicateur = 1;
    passif = 0;
    prixMulti = 20;
    prixPassif = 50;
    prixGoal = 1000;
    passifDisplay.textContent = passif;
    STpsDisplay.textContent = passif;
    nbClicDisplay.textContent = nbClic;
    multiDisplay.textContent = multiplicateur;
    multiStatDisplay.textContent = multiplicateur;
    alert('Bravo vous avez fais tout ça...... pour rien !');
  }
});

function getRandomBonusPosition() {
  const x = getRandomPosition(0, 900);
  const y = getRandomPosition(0, 500);
  return { x, y };
}

function showBonus() {
  const position = getRandomBonusPosition();
  bonusElement.style.left = `${position.x}px`;
  bonusElement.style.top = `${position.y}px`;
  bonusElement.style.display = 'block';
}

function hideBonus() {
  bonusElement.style.display = 'none';
}

bonusImage.addEventListener('click', () => {
  if (!malusActive) {
    malusActive = true;
    hideBonus();
    alert('Malus activé : -10 points par seconde pendant 10 secondes !');
    
    const malusInterval = setInterval(() => {
      score -= 10;
      scoreDisplay.textContent = score;
    }, 1000);

    malusTimer = setTimeout(() => {
      clearInterval(malusInterval);
      malusActive = false;
      alert('Le malus est terminé !');
    }, 10000);
  }
});

setInterval(() => {
  if (!malusActive && Math.random() < 0.5) { 
    showBonus();
    setTimeout(() => {
      hideBonus();
    }, 5000);
  }
}, 10000);