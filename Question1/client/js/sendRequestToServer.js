const endpointURL = 'http://localhost:3001/chat';

window.onload = init;

function init() {
    // Ecouteur sur le bouton
    const buttonElement = document.querySelector('button');
    buttonElement.onclick = sendRequest;

    // Ecouteur sur le slider
    const sliderElement = document.getElementById('slider');
    sliderElement.oninput = updateSliderValue;
}

// Met à jour l'affichage de la valeur du slider
function updateSliderValue() {
    const sliderElement = document.getElementById('slider');
    const valueElement = document.getElementById('sliderValue');
    valueElement.textContent = sliderElement.value;
}

// Envoi d'une requête POST à l'API de notre serveur
async function sendRequest() {
    // On récupère la valeur du prompt
    const inputElement = document.querySelector('input');
    const prompt = inputElement.value;

    // On récupère la valeur du slider
    const sliderValue = document.getElementById('slider').value;

    // si le prompt est vide on quitte la fonction
    if (prompt === '') return;

    // On envoie le contenu du prompt et du slider dans un FormData
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('sliderValue', sliderValue);

    // Envoi de la requête POST par fetch
    const response = await fetch(endpointURL, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    // Affiche la réponse dans la console
    console.log(data);
    
    // Div output pour afficher les résultats
    const outputElement = document.querySelector('#output');

    // affiche le resultat dans le div output
    const pElement = document.createElement('p');
    // On récupère le choix de l'IA (regarder la console ou la réponse dans le debugger du navigateur)
    pElement.textContent = data.choices[0].message.content;
    outputElement.append(pElement);

    // On remet à zéro le champ input
    inputElement.value = '';
}
