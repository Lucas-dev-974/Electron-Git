
// Toutes ou presque, variables utilisé ici a été initialiser dans home.js

git_init_btns.addEventListener('click', function(){             // Boutons pour initialiser un dossier avec un .git
    console.log(id_subfolder);
    git_utils.Init_repo()
})

editor_content.addEventListener('keydown', async function(e){   // Controlle + S pour sauvergarder
    if(e.key == 's' && e.ctrlKey){
        let file = {
            path: folder_datas_buffer.path,
            content: editor_content.value
        }
        await ipcRenderer.invoke('app:save-file', file)
    }
}, false)


let remote_url  = ""
let remote_name = ""
git_add_remote.addEventListener('click', function(){    // Boutons ajouter un remote distant
    if(remote_url.length == 0){
        remote_url = git_input_top.value
        git_input_top.value = ""
        git_input_top.placeholder = "Entrer le nom du repo"
    }else{
        remote_name = git_input_top.value
        git_input_top.value = ""
        git_input_top.placeholder = ""
    }
    if(remote_url.length != 0 && remote_name.length != 0){
        git_utils.Add_Remote(remote_url, remote_name)
        remote_url = ""
        remote_name = ""
    }
})

close_alert.addEventListener('click', () => {
    alert_msg.innerHTML = ""
    close_alert.classList.toggle('active')
})