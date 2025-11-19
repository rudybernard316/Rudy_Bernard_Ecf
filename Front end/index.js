
document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('#diaporama img');
    slides[currentSlide].style.display = 'block';

    function nextSlide() {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
    }

    function prevSlide() {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].style.display = 'block';
    }

    // Ajoutez les événements aux boutons
    document.querySelector('button[onclick="nextSlide()"]').addEventListener('click', nextSlide);
    document.querySelector('button[onclick="prevSlide()"]').addEventListener('click', prevSlide);


    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            if (this.innerText === 'Créer un compte') {
                alert('Fonctionnalité de création de compte en cours de développement.');
            } else if (this.innerText === 'Connexion') {
                // Rediriger vers la page de connexion
                window.location.href = 'Formulaire de connexion.html'; // Remplacez 'connexion.html' par le nom de votre fichier de connexion
            }
        });
    });

    // Fonction pour afficher les détails de l'événement dans une fenêtre pop-up
    function showEventDetails(title, date, playerCount) {
        alert(`Titre de l'événement : ${title}\nDate/Heure : ${date}\nNombre de joueurs : ${playerCount}`);
    }


    // Simulez un utilisateur avec le rôle d'administrateur
    let currentUser = { role: 'administrateur' };

    // Ajoutez un élément pour les actions
    const actionsDiv = document.getElementById('actions');

    // Fonction pour afficher les actions selon le rôle
    function displayActions() {
        actionsDiv.innerHTML = ''; // Réinitialiser les actions
        if (!currentUser) {
            actionsDiv.innerHTML = '<p>Vous êtes un Visiteur. Connectez-vous pour accéder aux fonctionnalités.</p>';
        } else if (currentUser.role === 'administrateur') {
            actionsDiv.innerHTML = `
                        <p>Vous êtes un Administrateur.</p>
                        <button onclick="validateOrganizer()">Valider un organisateur</button>
                        <button onclick="administerUsers()">Administrer les utilisateurs</button>
                        <button onclick="administerEvents()">Administrer les événements</button>
                        <button onclick="registerEvent()">S'inscrire à un événement</button>
                        <button onclick="leaveEvent()">Se désinscrire d'un événement</button>
                        <button onclick="participateDiscussion()">Participer à une discussion</button>
                    `;
        } else if (currentUser.role === 'organisateur') {
            actionsDiv.innerHTML = `
                        <p>Vous êtes un Organisateur.</p>
                        <button onclick="createEvent()">Créer un Événement</button>
                    `;
        }
    }

    // Appel initial pour afficher les actions
    displayActions();

    // Fermer le formulaire de connexion
    function closeLoginForm() {
        document.getElementById('login-form').style.display = 'none'; // Cache le formulaire
    }

    // Écouteur d'événements pour le bouton "Annuler"
    document.getElementById('cancel-login-button').addEventListener('click', closeLoginForm);


    // Gérer la soumission du formulaire de connexion
    document.getElementById('form-login').addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simuler la validation des identifiants
        if (username === 'admin' && password === 'mdp') {
            alert(`Connexion réussie pour ${username}!`); // Alerte de connexion réussie
            currentUser = { role: 'administrateur' }; // Rôle de currentUser
            displayActions(); // Mettre à jour l'affichage des actions
            closeLoginForm(); // Ferme le formulaire après la connexion
        } else {
            alert('Identifiants incorrects.');
        }
    });

    // Fonctions pour les actions
    function registerEvent() {
        alert("Inscription à un événement réussie !");
    }

    function leaveEvent() {
        alert("Désinscription d'un événement réussie !");
    }

    function participateDiscussion() {
        alert("Participation à une discussion !");
    }

    function createEvent() {
        alert("Événement créé (en attente de validation) !");
    }

    function validateOrganizer() {
        alert("Organisateur validé !");
    }

    function administerUsers() {
        alert("Administration des utilisateurs !");
    }

    function administerEvents() {
        alert("Administration des événements !");
    }

    // Afficher le lien "Créer un Événement" lors du survol
    const accessEventsLink = document.getElementById('access-events-link');
    const createTournamentLink = document.getElementById('create-tournament-link');
    const createEventForm = document.getElementById('create-event-form');
    let timeoutId; // Pour gérer le timeout

    accessEventsLink.addEventListener('mouseover', function () {
        if (currentUser && (currentUser.role === 'organisateur' || currentUser.role === 'administrateur')) {
            createTournamentLink.style.display = 'block';
            clearTimeout(timeoutId); // Réinitialiser le timeout si la souris reste au-dessus
        }
    });

    accessEventsLink.addEventListener('mouseout', function () {
        timeoutId = setTimeout(() => {
            createTournamentLink.style.display = 'none'; // Cache le lien après 4 secondes
        }, 4000);
    });

    // Afficher le formulaire de création d'événement
    createTournamentLink.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        createEventForm.style.display = 'block'; // Affiche le formulaire de création d'événement
    });

    // Gérer la soumission du formulaire de création d'événement
    document.getElementById('form-create-event').addEventListener('submit', function (event) {
        event.preventDefault();
        alert("Événement soumis avec succès !");
        createEventForm.style.display = 'none'; // Ferme le formulaire après soumission
    });

    // Afficher le formulaire de connexion
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('login-form').style.display = 'block';
        });
    }

    // Fermer le formulaire de création d'événement
    function closeCreateEventForm() {
        createEventForm.style.display = 'none'; // Cache le formulaire
    }

    // Écouteur d'événements pour le bouton "Annuler"
    document.getElementById('cancel-create-event-button').addEventListener('click', closeCreateEventForm);

    // Appel initial pour afficher les actions
    displayActions();
});

// Fonction pour lancer l'événement
function launchEvent(title, date) {
    const eventTime = new Date(date);
    const now = new Date();

    if (eventTime - now <= 30 * 60 * 1000 && eventTime > now) { // Vérifie si l'événement commence dans moins de 30 minutes
        alert(`L'événement "${title}" a été lancé avec succès !`);
        // Logique pour démarrer l'événement
    } else {
        alert(`L'événement "${title}" ne peut pas être lancé. Assurez-vous qu'il commence dans les 30 prochaines minutes.`);
    }
}

// Fonction pour vérifier l'état du bouton de lancement
function checkLaunchButtons() {
    const events = document.querySelectorAll('.event');
    const now = new Date();

    events.forEach(event => {
        const dateText = event.querySelector('p').innerText.split(' : ')[1]; // Récupère la date de l'événement
        const eventTime = new Date(dateText);

        const launchButton = event.querySelector('.launch-button');
        if (eventTime - now <= 30 * 60 * 1000 && eventTime > now) {
            launchButton.disabled = false; // Active le bouton si l'événement commence dans les 30 prochaines minutes
        } else {
            launchButton.disabled = true; // Désactive le bouton sinon
        }
    });
}

// Appeler la fonction pour vérifier l'état des boutons au chargement de la page
window.onload = checkLaunchButtons;

// Fonction pour enregistrer un joueur
function registerPlayer(eventTitle, maxPlayers) {
    const registeredCountElement = document.getElementById(`registered-count${eventTitle === 'Titre de l\'événement 1' ? '1' : '2'}`);
    const registeredCount = parseInt(registeredCountElement.innerText);

    // Vérifie si l'inscription est possible
    if (registeredCount < maxPlayers) {
        registeredCountElement.innerText = registeredCount + 1; // Incrémente le nombre d'inscrits
        updateProgressBar(eventTitle, maxPlayers, registeredCount + 1); // Met à jour la jauge
    } else {
        alert(`L'événement "${eventTitle}" est complet. Inscription impossible.`);
    }
}

// Fonction pour mettre à jour la jauge d'inscription
function updateProgressBar(eventTitle, maxPlayers, currentCount) {
    const progressBar = document.getElementById(`progress-bar${eventTitle === 'Titre de l\'événement 1' ? '1' : '2'}`);
    const percentage = (currentCount / maxPlayers) * 100;
    progressBar.style.width = percentage + '%'; // Met à jour la largeur de la jauge
}

// Fonction pour annuler l'inscription d'un joueur
function cancelRegistration(eventTitle) {
    const registeredCountElement = document.getElementById(`registered-count${eventTitle === 'Titre de l\'événement 1' ? '1' : '2'}`);
    const registeredCount = parseInt(registeredCountElement.innerText);

    if (registeredCount > 0) {
        registeredCountElement.innerText = registeredCount - 1; // Décrémente le nombre d'inscrits
        updateProgressBar(eventTitle, eventTitle === 'Titre de l\'événement 1' ? 10 : 8, registeredCount - 1); // Met à jour la jauge
    } else {
        alert(`Aucun joueur inscrit à "${eventTitle}" pour annuler.`);
    }
}

document.getElementById('form-create-event').addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    await createEvent(); // Appel à la fonction pour créer l'événement
});

async function createEvent() {
    const eventData = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        date: new Date(document.getElementById('start-date').value),
        maxPlayers: parseInt(document.getElementById('player-count').value),
        organizer: document.getElementById('organizer-pseudo').value,
        visibility: document.getElementById('visibility').value
    };

    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        const result = await response.json();
        alert(`Événement créé avec ID: ${result.id}`);
    } catch (error) {
        console.error('Erreur lors de la création de l\'événement:', error);
    }
}

document.getElementById('form-filter-events').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const filterDate = document.getElementById('filter-date').value;
    const filterPlayers = document.getElementById('filter-players').value;
    const filterOrganizer = document.getElementById('filter-organizer').value;

    // Appel de la fonction pour filtrer les événements
    filterEvents(filterDate, filterPlayers, filterOrganizer);
});

async function filterEvents(date, maxPlayers, organizer) {
    try {
        const response = await fetch('/api/events'); // Remplacez par l'URL de votre API pour récupérer tous les événements
        const events = await response.json();

        // Filtrer les événements selon les critères
        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const isDateMatch = date ? eventDate.toISOString().slice(0, 16) === date : true;
            const isPlayersMatch = maxPlayers ? event.maxPlayers <= maxPlayers : true;
            const isOrganizerMatch = organizer ? event.organizer.toLowerCase().includes(organizer.toLowerCase()) : true;

            return isDateMatch && isPlayersMatch && isOrganizerMatch;
        });

        displayFilteredEvents(filteredEvents); // Fonction pour afficher les événements filtrés
    } catch (error) {
        console.error('Erreur lors du filtrage des événements:', error);
    }
}

function displayFilteredEvents(events) {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = ''; // Réinitialiser l'affichage

    if (events.length === 0) {
        eventsContainer.innerHTML = '<p>Aucun événement trouvé.</p>';
    } else {
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.innerHTML = `
                <h3>${event.title}</h3>
                <p>Date : ${new Date(event.date).toLocaleString()}</p>
                <p>Description : ${event.description}</p>
                <p>Organisateur : ${event.organizer}</p>
                <p>Max Joueurs : ${event.maxPlayers}</p>
            `;
            eventsContainer.appendChild(eventElement);
        });
    }
}
