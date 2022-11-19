# Projet API

## Explication du projet : 

Notre api concerne une application de petits services que les gens demandent. Pour mieux comprendre, l’utilisateur a un profil qui le définit et il peut se connecter et mettre un service sur l’application (ex : Tondre mon jardin / Réinitialiser mon ordinateur / Babysitting…). Le service a plusieurs caractéristiques qui sont à remplir avant de pouvoir le poster. 

Une fois que mon service est prêt je le poste sur la plateforme et les autres utilisateurs peuvent le voir et éventuellement y répondre. S’ils sont disponibles pour venir alors ils cliquent sur « prendre rendez-vous » pour que l’utilisateur qui a posté le service reçoive l’information que quelqu’un peut venir (temps réel). 

Nos services sont aussi localisés avec des coordonnées. 

La prise de rendez-vous elle est déterminé par son propre id mais aussi avec l’id de l’utilisateur qui a pris le rendez-vous et celui de la personne qui a posté ce service. 

## Structure 

User : 
- Name
- Email
- Password

Service : 
- Titre
- Type
- Date
- Provider
- Picture
- Location

Rdv : 
- Related service
- Provider 
- Receiver
- isAccepted


Bonne découverte de notre API ! 


Daniel, Déborah, Tanya, Julie 
