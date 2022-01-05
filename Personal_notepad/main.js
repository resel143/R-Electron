const electron = require('electron');
// this app is our browser

const {app} = electron;

app.on('ready',()=>{
    console.log(`Welcome to first Electron Project Reshul!`);
})
