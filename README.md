# DiscordXPronote

DiscordXPronote est un script Node.js qui permet de notifier automatiquement le menu de la cantine sur un serveur Discord, avec d'autres types de notifications à venir. Il utilise le wrapper [Pawnote](https://github.com/LiterateInk/Pawnote) pour interagir avec Pronote.

## Fonctionnalités

- **Notification du menu de la cantine** : Envoie automatiquement le menu quotidien de la cantine sur un canal Discord.

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 16 ou plus)
- [npm](https://www.npmjs.com/) (ou `yarn`)
- Un serveur Discord avec un bot configuré et des autorisations d'envoi de messages
- Un accès à un compte Pronote valide

## Installation

1. Clonez le repository :

    ```bash
    git clone https://github.com/votre-Margouta/DiscordXPronote.git
    cd DiscordXPronote
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Modifiez le fichier `example.env` avec les variables suivantes :

    ```bash
    PRN_URL=https://rne.index-education.net/pronote?login=true # MODIFIER PAR VOTRE RNE
    PRN_UUID= # UUID ALEATOIRE 
    PRN_USERNAME= # USERNAME PRONOTE EN CONNEXION DIRECTE (SANS PASSER PAR L'ENT/EDUCONNECT)
    PRN_PASSWORD= # MOT DE PASSE PRONOTE EN CONNEXION DIRECTE (SANS PASSER PAR L'ENT/EDUCONNECT)
    DISCORD_WEBHOOK_MENU=https://discord.com/api/webhooks/ # WEBHOOK DISCORD POUR LES NOTIFICATIONS DES MENUS
    ```

4. Lancez le script :

    ```bash
    npm run menu
    ```

## Utilisation

- Une fois configuré, le bot enverra automatiquement une notification quotidienne avec le menu de la cantine dans le canal Discord spécifié.
- D'autres types de notifications (comme les emplois du temps ou les devoirs) pourront être ajoutés à l'avenir.

## Contribuer

Les contributions sont les bienvenues ! Pour soumettre des modifications ou signaler des problèmes :

1. Forkez ce repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Faites vos modifications et commitez-les (`git commit -m 'Ajout de ma fonctionnalité'`).
4. Push vos changements (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une pull request.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
