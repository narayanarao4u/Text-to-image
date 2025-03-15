const body = document.body; // Get the body element
const themetoggle = document.querySelector('.theme-toggle');
const prompt = document.querySelector('.prompt-btn');
const promptInput = document.querySelector('.prompt-input');
const promptForm = document.querySelector('.prompt-form');
const selectModel = document.querySelector('#select-model');
const selectCount = document.querySelector('#select-count');
const selectRatio = document.querySelector('#select-ratio');
const galleryGrid = document.querySelector('.gallery-grid');


const API_KEY = 'API_KEY'; // Replace with your Hugging Face API key




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

let tt = `
                        <div class="img-overlay">
                            <div class="img-download-btn">
                                <i class="fa-solid fa-download"></i>
                            </div>
                        </div>
`

const getImageDimensions = (aspectRatio, baseSize = 512) => { 
  
    const [width, height] = aspectRatio.split("/").map(Number);
    const scaleFactor = baseSize / Math.sqrt(width * height);

    let calculatedWidth = Math . round(width * scaleFactor);
    let calculatedHeight = Math. round(height * scaleFactor);
    
    // Ensure dimensions are multiples of 16 (AI model requirements)
    calculatedWidth = Math. floor(calculatedWidth / 16) * 16;
    calculatedHeight = Math. floor(calculatedHeight / 16) * 16;
    
    return { width: calculatedWidth, height: calculatedHeight }
}

const updateImageCard = (index, ImgURL) => {
  const imgCard = document.getElementById(`img-card-${index}`);

  if(!imgCard) {
    return;
  }

  imgCard.classList.remove('loading');
  imgCard.classList.remove('error');

  imgCard.innerHTML = ` 
  <img src="${ImgURL}" alt="" class="result-img">
   <div class="img-overlay">
      <a  href="${ImgURL}"  download="${Date.now()}.png" class="img-download-btn">
          <i class="fa-solid fa-download"></i>
      </a>
  </div>
  
  `


}
const generateImage =  async (model, count, ratio, promptText) => {
  const MODEL_URL = `https://router.huggingface.co/hf-inference/models/${model}`

  const { width, height } = getImageDimensions(ratio);

  const imagePromises = Array.from({ length: count }, async (_, i) => {

      try {
        const response = await fetch(MODEL_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "x-use-cache": "false",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: promptText,
            parameters: {width, height},
            options : {wait_for_model: true, user_cache: false}
          }),

        }) ;

        if(!response.ok) {
          throw new Error((await response.json())?.error);
        }

        const result = await response.blob();
        updateImageCard(i, URL.createObjectURL(result));
        

      } catch (error) {
        console.error(error);
      }



  });

 await Promise.allSettled(imagePromises);

}
const CreateImageCard = (model, count, ratio, promptText) => {
  galleryGrid.innerHTML = ''; // Clear the gallery grid
  for (let i = 0; i < count; i++) {
    galleryGrid.innerHTML += `
                       <div class="img-card loading" id="img-card-${i}" 
                        style="aspect-ratio: ${ratio};">
                        <div class="status-container ">
                            <div class="spinner"></div>
                            <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.75rem; color: #ef4444;"></i>
                            <p class="status-text">Generating . . .</p>
                        </div>
                       
                    </div>
    `
  }

  generateImage(model, count, ratio, promptText); // Generate images using the selected model, count, ratio, and prompt text
}

promptForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  const model = selectModel.value;
  const count = parseInt(selectCount.value) || 1;
  const ratio = selectRatio.value || 1;
  const promptText = promptInput.value.trim(); // Get the value of the input field

  CreateImageCard(model, count, ratio, promptText);
  


})
