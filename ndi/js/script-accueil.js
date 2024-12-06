document.querySelectorAll('.zone-clic').forEach(zone => {
    zone.addEventListener('click', function(event) {
        const zoneId = event.target.id;  // Récupère l'ID de la zone cliquée

        // Faire disparaître toutes les zones cliquables et le schéma humain
        const bodyImage = document.getElementById('human-body');
        const zones = document.querySelectorAll('.zone-clic');
        zones.forEach(zone => zone.style.display = 'none');  // Cacher toutes les zones
        bodyImage.style.transition = "opacity 1s ease-out";
        bodyImage.style.opacity = "0";  // Masquer le schéma humain

        // Cacher le planisphère au départ
        const planisphere = document.getElementById('planisphere');
        planisphere.style.transform = 'scale(1.5)';
        planisphere.style.opacity = '1';

        // Afficher l'infobulle correspondante à la zone cliquée
        const infobubble = document.getElementById(`infobubble-${zoneId}`);
        infobubble.style.display = 'block'; // Afficher l'infobulle

        // Afficher le planisphère avec un léger zoom
        planisphere.style.transition = 'transform 1s ease-out'; // Transition du zoom
        planisphere.style.transform = 'scale(1.5)';
        planisphere.style.opacity = '1';  // Rendre le planisphère visible

        // Afficher l'image spécifique pour la zone cliquée
        const imageForZone = document.getElementById('zone-image');
        imageForZone.style.display = 'block'; // Afficher l'image pour la zone
        imageForZone.src = `images/${zoneId}--background.jpg`; // Définir l'URL de l'image spécifique à la zone

        // Création et affichage du bouton de retour dans le header (optionnel)
        let returnButton = document.getElementById('return-button');
        if (!returnButton) {
            returnButton = document.createElement('button');
            returnButton.textContent = "Retour au Schéma";
            returnButton.id = "return-button"; // ID pour pouvoir y accéder facilement
            returnButton.style.padding = '10px 20px'; // Padding
            returnButton.style.fontSize = '14px'; // Taille du texte
            returnButton.style.borderRadius = '5px'; // Coins arrondis
            returnButton.style.backgroundColor = '#FF5733'; // Fond orange
            returnButton.style.color = '#fff'; // Texte en blanc
            returnButton.style.border = 'none'; // Pas de bordure
            returnButton.style.zIndex = '10000'; // Z-index élevé pour le mettre au-dessus des autres éléments
            returnButton.style.position = 'relative'; // S'assurer qu'il est dans le flux de l'header
            returnButton.style.marginLeft = '10px'; // Un petit décalage horizontal si nécessaire
            returnButton.style.marginTop = '10px'; // Un petit décalage vertical si nécessaire
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(returnButton); // Ajouter le bouton au DOM dans le header
            }
        }

        // Vérification du bouton
        console.log("Le bouton est ajouté au header");

        // Ajouter l'événement de clic pour le bouton
        returnButton.addEventListener('click', function() {
            console.log("Retour au schéma cliqué");
            resetZoom();  // Appeler la fonction resetZoom pour réinitialiser le zoom
        });

        // Afficher le bouton
        returnButton.style.display = 'block';  // S'assurer que le bouton est visible
    });
});

// Fonction pour réinitialiser l'effet de zoom et revenir au schéma
function resetZoom() {
    const bodyImage = document.getElementById('human-body');
    const planisphere = document.getElementById('planisphere');
    const zones = document.querySelectorAll('.zone-clic');
    const returnButton = document.getElementById('return-button');
    const infobubbles = document.querySelectorAll('.infobubble');
    const imageForZone = document.getElementById('zone-image');

    // Réinitialiser l'effet de zoom
    bodyImage.style.opacity = '1';  // Réafficher l'image du schéma humain
    planisphere.style.transition = 'transform 1s ease-out'; // Transition pour réinitialiser le zoom
    planisphere.style.transform = 'scale(1)';  // Réinitialiser le zoom du planisphère
    planisphere.style.opacity = '0.3';  // Rendre le planisphère moins visible

    // Réafficher toutes les zones
    zones.forEach(zone => zone.style.display = 'block');

    // Masquer toutes les infobulles
    infobubbles.forEach(bubble => bubble.style.display = 'none');

    // Masquer l'image de la zone
    imageForZone.style.display = 'none';

    // Masquer le bouton de retour
    returnButton.style.display = 'none';  // Masquer le bouton de retour
}

// Ajouter un écouteur d'événement pour la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const infobubbles = document.querySelectorAll('.infobubble');
        infobubbles.forEach(bubble => bubble.style.display = 'none');  // Masquer toutes les infobulles
        resetZoom();  // Réinitialiser le zoom et revenir au schéma
    }
});

// Drag and Drop : Déplacer les mots
document.querySelectorAll('.drag-box').forEach(word => {
    word.setAttribute('draggable', true);  // Assurez-vous que les éléments sont draggable
    word.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text', event.target.textContent);  // Enregistrer le mot à faire glisser
    });
});

// Déposer les mots dans les blancs
document.querySelectorAll('.blank').forEach(blank => {
    blank.addEventListener('dragover', function(event) {
        event.preventDefault();  // Permettre le dépose
    });

    blank.addEventListener('drop', function(event) {
        event.preventDefault();  // Eviter l'action par défaut
        const draggedWord = event.dataTransfer.getData('text');  // Récupérer le mot
        const correctWord = blank.dataset.correctWord;  // Le mot correct pour cette case
        
        blank.textContent = draggedWord;  // Insérer le mot dans le blanc
        
        // Vérification de la réponse
        if (draggedWord === correctWord) {
            blank.style.color = 'green';  // Bonne réponse
        } else {
            blank.style.color = 'red';  // Mauvaise réponse
        }
        
        blank.style.fontWeight = 'bold';  // Mettre en gras pour plus de visibilité
    });
});
