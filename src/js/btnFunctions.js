const { ipcRenderer } = require('electron')

const ipc = ipcRenderer

// Minimize

minimizeBtn.addEventListener('click', () => {
  ipc.send('minimizeApp')
})

// Maximize | Restore

const maxResBtn = document.getElementById("maxResBtn")
const maxResDiv = document.getElementById("maxResDiv")

maxResBtn.addEventListener('click', () => {
  ipc.send('maximizeRestoreApp')
})

function changeMaxResBtn(isMaximizedApp) {
  if (isMaximizedApp) {
    console.log('entrei no if')
    maxResBtn.title = "Restore"
    maxResDiv.classList.remove("maximizeIcon")
    maxResDiv.classList.add("restoreIcon")
  } else {
    console.log('entrei no else')
    maxResBtn.title = "Maximize"
    maxResDiv.classList.remove("restoreIcon")
    maxResDiv.classList.add("maximizeIcon")
  }
}

ipc.on('isMaximized', () => { changeMaxResBtn(true) })
ipc.on('isRestored', () => { changeMaxResBtn(false) })

// Close

closeBtn.addEventListener('click', () => {
  ipc.send('closeApp')
})
