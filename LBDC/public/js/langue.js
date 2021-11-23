// Creation de la fonction language qui fonctionne de pair avec les onClick de HTML.
function language(lang) {
    // Assignation a la variable langue de la langue recupéré via le onClick.
    langue = lang;
    // J'appelle ma fonction saveLanguagesToStorage afin de sauvegarder dans le localstorage la langue choisi.
    saveLanguagesToStorage(langue)
    // J'actualise ma page a chaque changement de langue afin qu'elle soit pris en compte.
    window.location.reload();
}

// Creation de la fonction saveLanguagesToStorage(langue).
function saveLanguagesToStorage(langue) {
    localStorage.setItem('langue', langue);
}


let langue = "fr-FR";

// J'utilise une condition afin de sauvegarder et determiner quel est la langue chosi par l'utilisateur.
// Si mon storage existe alors je peux manipuler mon localStorage.
// Je recup la valeur de la clé langue puis je l'assigne a la variable savedLanguage.
// Si la savedLanguage est different de null.
// Alors j'assigne savedLanguage a ma variable langue.
// Sinon J'assigne la langue FR par defaut.
if (typeof (Storage) !== "undefined") {
    let savedLanguage = localStorage.getItem('langue');
    if (savedLanguage !== null) {
        langue = savedLanguage;
    } else {
        saveLanguagesToStorage("fr-FR");
    }
}



// Button de language.

let click = document.querySelector('.click');

let list = document.querySelector('.list-lang');

click.addEventListener("click", () => {

    list.classList.toggle('newlist-lang');

});


// Button precedent afin de revenir a l'accueil.    

document.getElementById('go-back').addEventListener('click', () => {
    document.location.href = 'http://localhost:3000/'
});