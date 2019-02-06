const Groupes = require('./models/groupe')
const Medecins = require('./models/medecin')
const Operateurs = require('./models/operation')
const users = require('./models/utilisateur')
const typeUsers = require('./models/typeUser')

const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain, dialog } = electron;

let mainWindow, addedWindow;
//attente du chargement de la page

let emptyArray = [];

app.on('ready',() => {
    const menuVide =  Menu.buildFromTemplate(emptyArray);
    //const menuVide =  Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(menuVide);

    //creation d'une nouvelle fenetre
    mainWindow = new BrowserWindow({width:1050,height:600,icon: __dirname + 'view/image/favicon.png'});
    //chargement du contenu Html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view','login.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.webContents.send('ping',Groupes.findAll())
})

function setMainWindow(name){
    addedWindow = mainWindow;
    mainWindow = new BrowserWindow({title: 'Gestion des Caisses',width:1050,height:600,icon: __dirname + 'view/image/favicon.png'});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view',name),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
    addedWindow.on('close', () => {
        addedWindow = null;
    })

    addedWindow.close()
} 

function loadWindow(chemin){
    addedWindow = new BrowserWindow({title: 'Gestion des Caisses',width:1050,height:600,icon: __dirname + 'view/image/favicon.png'});
    addedWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view',chemin),
        protocol: 'file',
        slashes: true
    }));
    
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    addedWindow.on('close', () => {
        addedWindow = null;
    })
}

const mainMenuTemplate = [
    {
        label: "Groupe de service",
        submenu: [
            {
                label: 'Ajouter un groupe de service',
                click()
                {
                    setMainWindow('groupe/add.html');
                }
            },
            {
                label: 'Liste des groupe de services',
                click()
                {
                    setMainWindow('groupe/liste.html');
                }
            }
        ]
    },
    {
        label: "Medecin",
        submenu: [
            {
                label: 'Ajouter un medecin',
                click()
                {
                    setMainWindow('medecin/add.html');
                }
            },
            {
                label: 'Liste des medecins',
                click()
                {
                    loadWindow('medecin/liste.html');
                }
            }
        ]
    },
    {
        label: "Opération",
        submenu: [
            {
                label: 'Ajouter une opération',
                click()
                {
                    setMainWindow('operation/add.html');
                }
            },
            {
                label: 'Liste des opérations',
                click()
                {
                    loadWindow('operation/liste.html');
                }
            }
        ]
    },
    {
        label: "Utilisateur",
        submenu: [
            {
                label: 'Ajouter un utilisateur',
                click()
                {
                    setMainWindow('utilisateur/add.html');
                }
            },
            {
                label: 'Liste des utlisateurs',
                click()
                {
                    loadWindow('utilisateur/liste.html');
                }
            }
        ]
    },
    {
        label: "A-propos",
        submenu: [
            {
                label: 'Documentation',
                click()
                {
                    loadWindow('about/document.html');
                }
            },
            {
                label: 'Aide',
                click()
                {
                    loadWindow('about/help.html');
                }
            },
            {
                label: 'Auteur',
                click()
                {
                    loadWindow('about/author.html');
                }
            }
        ]
    },
    {
        label: 'Fermer',
        accelerator: process.platform == "darwin" ? 'Command+Q' : 'Ctrl+Q',
        click(){
            app.quit();
        }
    }
];

function login(element){
    if(element.email != null && element.password)
        return false
    
    users.findOne({
        where: {
            email: element.email,
            password: element.password
        }
    }).then((user) => true)
    return false
}
ipcMain.on('login:check', (e, item) => {
    console.log(item)
    setMainWindow('index.html');
    // if(login(item))
    // {
    //     setMainWindow('index.html');
    // }
    // else
    // {
    //     dialog.showMessageBox({type: 'error',message: "Vous n'avez pas le droit de vous connectez car vos identifiant ne correspondent pas"})
    // }
});

ipcMain.on('groupe:add', (event, item) => {
    Groupes.create({
        nom: item.groupe,
        ristourne: item.remise
    })
    setMainWindow('index.html');
});

ipcMain.on('medecin:add', (event, item) => {
    Medecins.create({
        nom: item.nom,
        prenoms: item.prenoms,
        cni: item.cni,
        contact: item.contact,
        poste: item.poste,
        email: item.email,
        ville: item.ville,
    })
    setMainWindow('index.html');
});

ipcMain.on('utilisateur:add', (event, item) => {
    users.create({
        email: item.email,
        password: item.password,
        type_user_id: item.type_user_id,
    })
    setMainWindow('index.html');
});

ipcMain.on('operation:add', (event, item) => {
    let ristourne = Groupes.findOne({
    where: {
        id: item.groupe
    }
    }).then( (groupe) => groupe.ristourne)

    Operateurs.create({
    nom: item.nom,
    montant_normal: item.montant_normal,
    montant_rabbais: item.montant_rabbais,
    quantity : item.quantity,
    montant_encaisse: item.montant_rabbais * item.quantity,
    groupe: item.groupe,
    montant_payer:  (item.montant_rabbais * item.quantity)( 1 - (ristourne/ 100))
    })

    setMainWindow('index.html');
});

if(process.platform == "darwin"){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    if(mainMenuTemplate){
        mainMenuTemplate.push({
            label: 'Outil de developpement',
            submenu: [
                {
                    label: 'Toogle DevTools',
                    accelerator: process.platform == "darwin" ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        });
    }
    else
    {
        emptyArray.push({
            label: 'Outil de developpement',
            submenu: [
                {
                    label: 'Toogle DevTools',
                    accelerator: process.platform == "darwin" ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        });
    }
    
}