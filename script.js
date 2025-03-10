const body = document.body; // Get the body element
const themetoggle = document.querySelector('.theme-toggle');
const prompt = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const selectModel = document.querySelector('#select-model');
const selectCount = document.querySelector('#select-count');
const selectRatio = document.querySelector('#select-ratio');
const galleryGrid = document.querySelector('.gallery-grid');

const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
  ];

  (() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      themetoggle.querySelector('i').className = 'fas fa-sun';
    } else {
      body.classList.remove('dark-theme');
      themetoggle.querySelector('i').className = 'fas fa-moon';
    }
  }

  )();

themetoggle.addEventListener('click', () => {
  const isDarkTheme =  body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  themetoggle.querySelector('i').className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
})

prompt.addEventListener('click', () => {
const promptIndex = Math.floor(Math.random() * examplePrompts.length);
const promptText = examplePrompts[promptIndex];
promptInput.value = promptText; // Set the value of the input field to the random prompt
promptInput.focus(); 
 
})

const CreateImageCard = (model, count, ratio, promptText) => {
  for (let i = 0; i < count; i++) {
    
  }
}

promptForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  const model = selectModel.value;
  const count = parseInt(selectCount.value) || 1;
  const ratio = selectRatio.value || 1;
  const promptText = promptInput.value.trim(); // Get the value of the input field

  CreateImageCard(model, count, ratio, promptText);
  


})
