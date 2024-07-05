# Zombitronpolis

new stuuff motion orientation: 

Attentiooon pour utiliser ces types de capteurs il faut utiliser l'https: petite manip en plus détaillée juste en dessous. 
Sinon tout pareil que pour les autres: 

Capteur de mouvement 
- Vitesse lineaire et angulaire // demo ici => `https://[ZOMBITRON_SERVEUR_IP]/devicemotion`
- Orientation // demo ici => `https://[ZOMBITRON_SERVEUR_IP]/deviceorientation`

## Spécificité pour l'ajout de la gestion des capteurs: 
Generer un certificat  https: 
sudo openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout selfsigned.key -out selfsigned.crt
à placer à la racine du code. 

IPHONE 
Parfois : il faut activer la motion dans les parametres du telephone > safari

Attention: c'est passé en https pour permettre l'usage des capteurs. (ca veut dire pas oublier le https dans l'url )

## Setup serveur
1. Choisir un vieil Android pour le transformer en serveur-zombitron.
2. Installer [Termux](https://play.google.com/store/apps/details?id=com.termux) sur l'appareil
3. Lancer Termux et installer node, git et yarn
  ```
  pkg install node git yarn
  ```
4. Cloner le repo
  ```
  git clone https://github.com/noesya/zombitronpolis
  ```
5. Rentrer dans le dossier, installer les dépendances
  ```
  cd zombitronpolis
  yarn install
  ```
6. Lancer le serveur
  ```
  yarn start
  ```

## Mise à jour

Pour avoir la dernière version du code, lancer `git pull` dans le répertoire du projet, puis relancer le serveur.

## Pour se connecter depuis son ordi au zombitron serveur

### Setup serveur

1. Installer OpenSSH
  ```
  pkg install openssh
  ```
2. Lancer le serveur SSH
  ```
  sshd
  ```
3. Configurer le mot de passe utilisateur avec la commande `passwd`.

### Connexion client

Dans un terminal : `ssh [ZOMBITRON_SERVEUR_IP] -p 8022` et entrer le mot de passe.
