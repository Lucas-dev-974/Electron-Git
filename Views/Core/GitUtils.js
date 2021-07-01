const { ipcRenderer } = require('electron');
const simpleGit = require('simple-git');

class GitUtil{
    constructor(folder_path, git_url){
        this.folder_path   = folder_path
        this.git_url       = git_url
        this.is_git_folder = false
        this.git = simpleGit(folder_path, {binary: 'git'})
        this.status = {
            have_remote: null,
            file_to_add: 0,
            file_to_commit: 0,
            file_to_push: 0,
        }

        this.InitStatus()
        this.message_to_commit = null
        
        
        
    }
    
    async InitStatus(){
        // try{
        //     let remotes = await this.git.listRemote()
        //     console.log("have remote: " + remotes);
        // }catch(er){
        //     console.log('pas de remote distant')
        //     this.status.have_remote = null
        // }
        
    }

    async InitGitBtns(git_btns_top){ // git_btns_top touts les composants html
        this.is_git_folder = await this.git.checkIsRepo()
        console.log("folder is git linked with git repo: " + this.status.have_remote);
        this.git_btns_top = git_btns_top

        if(this.is_git_folder){ // Si il ya un .git
            if(this.status.have_remote === null){   // Si ya pas de repo connecter
                git_btns_top.git_init_btns.style.display = 'none'
                git_btns_top.git_status_btns.style.display = 'flex'
                git_btns_top.git_add_remote.style.display = 'block'
                git_btns_top.git_upload_files.style.display = 'block'
                git_btns_top.git_input_top.placeholder = 'Entrer un repo en ligne'
            }else{
                git_btns_top.git_status_btns.style.display = 'flex'
                git_btns_top.git_init_btns.style.display = 'none'
                git_btns_top.git_add_remote.style.display = 'block'
            }
        }else{
            git_btns_top.git_init_btns.style.display = 'flex'
            git_btns_top.git_status_btns.style.display = 'none'
        }
    }

    async Add_Remote(remote_url, remote_name){
        try{
            let state = await this.git.addRemote(remote_name, remote_url)
            console.log(state);
            this.InitGitBtns(this.git_btns_top)
        }catch(e){
            this.git_btns_top.alert_msg.classList.toggle('alert')
            this.git_btns_top.alert_close_btn.classList.toggle('active')
            this.git_btns_top.alert_msg.appendChild(document.createTextNode('Le nom ' + remote_name + ' existe déjà !'))
        }

    }

    async Init_repo(remote){
        console.log('init git repo in git ut');
        await this.git.init()
    }

    async InitState_repo(){
        
    }
}


module.exports = GitUtil