const electron = require('electron');
const fs = require('fs');
// this app is our browser

const {app, BrowserWindow, ipcMain, dialog, Menu} = electron;
let win;
let filepath = undefined;
app.on('ready',()=>{
    // console.log(`Welcome to first Electron Project Reshul!`);
    win = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }
    })
    win.loadFile('index.html');
    const menu = Menu.buildFromTemplate(mainmenu);
    Menu.setApplicationMenu(menu);
})

ipcMain.on('save',(event, text)=>{
//  saving text to a File
    // console.log(text);
    if(filepath === undefined){
        dialog.showSaveDialog(win,{defaultPath:'filename.txt'}, (fullpath)=>{
            if(fullpath){
                    filepath = fullpath;
                    fs.writeFile(filepath,text,(err) =>{
                    if(err) console.log("Error identified");
                    console.log('The file has been saved!');
                    win.webContents.send('saved', 'success');
                });
            }
        })
    }else{
        fs.writeFile(filepath,text,(err) =>{
            if(err) console.log("Error identified");
            console.log('The file has been saved!');
            win.webContents.send('saved', 'success');
        });
    }
})

const mainmenu =[
    {
        label: "File",
        submenu:[
            {
                label: 'Save',
                accelerator: "Ctrl+S",
                click() {console.log('Save from Renderer Menu'); win.webContents.send("save-clicked")}
            },
            {
                label: "Save As",
                accelerator: "Ctrl+N",
                click(){ console.log('New file from Renderer Submenu');filepath=undefined; win.webContents.send("save-clicked");}
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'viewMenu'
    }
]