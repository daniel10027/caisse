const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//attente du chargement de la page
app.on('ready',function(){
    //creation d'une nouvelle fenetre
    mainWindow = new BrowserWindow({});
    //chargement du contenu Html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

const mainMenuTemplate = [
    {
        label: "Groupe de service",
        submenu: [
            {
                label: 'Ajouter un groupe de service'
            },
            {
                label: 'Liste des groupe de  services'
            }
        ]
    },
    {
        label: "Medecin",
        submenu: [
            {
                label: 'Ajouter un medecin'
            },
            {
                label: 'Liste des medecins'
            }
        ]
    },
    {
        label: "Opération",
        submenu: [
            {
                label: 'Ajouter une opération'
            },
            {
                label: 'Liste des opérations'
            }
        ]
    },
    {
        label: "Utilisateur",
        submenu: [
            {
                label: 'Ajouter un utilisateur'
            },
            {
                label: 'Liste des utlisateurs'
            }
        ]
    },
    {
        label: "A-propos",
        submenu: [
            {
                label: 'Documentation'
            },
            {
                label: 'Aide'
            },
            {
                label: 'Auteur'
            }
        ]
    },
    {
        label: 'Fermer'
    }
];