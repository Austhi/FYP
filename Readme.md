# Nom du Projet Backend

## Description

Ce projet est une application backend développée avec le framework Adonis.js. Il sert de backend pour Digital Health et fournit les fonctionnalités nécessaires pour gérer les donnees medical de patient de manière securisée.

## Installation

Assurez-vous d'avoir Node.js et npm installés sur votre machine. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).

1. Le clonage de ce dépôt sur votre machine peut se faire via cet commande ci dessous:0
   ```bash
   git clone https://github.com/Austhi/FYP.git
   ```

2. Il est ensuite necessaire d'utiliser docker-compose pour faciliter la compilation de nos trois parties en simultané.

Deux manières sont disponible afin de realiser cela, la version en ligne de commande pour Linux et la version via Docker Desktop

je detaillerai ici seulement la version cmd pour l'instant

3. Installation de Docker

A finir

```bash
```


les dépendances avec npm :

```bash
   npm install
```


3. Configuration et mise en place des databases

Exécutez les migrations pour créer les tables de base de données :

```bash
   node ace migration:run
```

4. Démarrage du Serveur

Lancez le serveur Adonis.js en utilisant la commande suivante :


```bash
   node ace serve --watch
```