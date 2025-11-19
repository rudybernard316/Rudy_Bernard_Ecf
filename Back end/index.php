<?php
$servername = "localhost";
$username = "root"; // Nom d'utilisateur
$password = ""; // Mot de passe par défaut
$dbname = "esportify"; // Nom de la base de données

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Check la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Inscription des utilisateurs
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['pseudo'])) {
    $pseudo = $conn->real_escape_string($_POST['pseudo']);
    $nom = $conn->real_escape_string($_POST['nom']);
    $prenom = $conn->real_escape_string($_POST['prenom']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $email = $conn->real_escape_string($_POST['email']);

    $stmt = $conn->prepare("INSERT INTO utilisateurs (pseudo, nom, prenom, password, email) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $pseudo, $nom, $prenom, $password, $email);

    if ($stmt->execute()) {
        echo "Nouvel utilisateur créé avec succès";
    } else {
        echo "Erreur : " . $stmt->error;
    }
    $stmt->close();
}

// Traitement création d'événements
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['event-title'])) {
    $titre = $conn->real_escape_string($_POST['event-title']);
    $description = $conn->real_escape_string($_POST['event-description']);
    $date_debut = $conn->real_escape_string($_POST['start-date']);
    $date_fin = $conn->real_escape_string($_POST['end-date']);
    $nombre_joueurs = $conn->real_escape_string($_POST['player-count']);
    $images = $conn->real_escape_string($_POST['event-images']);
    $pseudo_organisateur = $conn->real_escape_string($_POST['organizer-pseudo']);
    $visibilite = $conn->real_escape_string($_POST['visibility']);

    $stmt = $conn->prepare("INSERT INTO evenements (titre, description, date_debut, date_fin, nombre_joueurs, images, pseudo_organisateur, visibilite) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssss", $titre, $description, $date_debut, $date_fin, $nombre_joueurs, $images, $pseudo_organisateur, $visibilite);

    if ($stmt->execute()) {
        echo "Événement créé avec succès";
    } else {
        echo "Erreur : " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription et Création d'Événements</title>
</head>

<body>
    <?php include 'formulaire.php'; ?>
</body>

</html>