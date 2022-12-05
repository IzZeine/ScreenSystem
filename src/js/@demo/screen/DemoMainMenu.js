import {gsap} from "gsap";
import DemoCanvasScreen from "./DemoCanvasScreen";
import axios from "axios";
import ScreenBase from "../../@provided/screen/core/ScreenBase";

export default class DemoMainMenu extends ScreenBase{
    constructor(params) {
        super(params);
    }

    // 0-Build. L'écran n'est pas encore affiché
    async build(builtCompleteCallback) {

        // Chargement d'un fichier externe (template html)
        let html = await axios.get('./assets/templates/main-menu.tpl.html');
        this.display.innerHTML = html.data
        this.display.style.backgroundColor = 'steelblue'
        builtCompleteCallback();


        // Via XHR
        // let xhr = new XMLHttpRequest();
        // xhr.open('get', './assets/templates/main-menu.tpl.html');
        // xhr.onload = (response)=>{
        //     this.display.innerHTML = xhr.responseText;
        //     this.display.style.backgroundColor = 'steelblue'
        //     builtCompleteCallback();
        // }
        // xhr.send();
    }

    // 1- Prepare activation : L'ecran est affiché, et commence ses updates.
    prepareActivation(preparationCompleteCallback) {
        gsap.from( this.display.querySelectorAll('ul li p'), {duration:0.7,opacity:0,onComplete:preparationCompleteCallback});
    }

    // 2- L'ecran a termine sa preparation, l'ecran est affiché. L'ancien est supprimé. Il va commencer ses screenUpdate
    activate(exitCallback) {
        super.activate(exitCallback);


        // C'est le moment de mettre les addEventListener
        let buttons = this.display.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.addEventListener('click', ()=>{
                this.exitCallback( DemoCanvasScreen )
            })
        }
    }

    // 3- L'écran à demander à sortir, le screen system lui permet de preparer sa deactivation
    prepareDeactivation(preparationCompleteCallback) {
        gsap.to( this.display.querySelectorAll('ul li p'), {duration:0.7,opacity:0,onComplete:preparationCompleteCallback});
    }

    // 4- L'ecran a termine sa préparation de desactivation
    deactivate() {

        // Suppressions des eventListener

        // ou suppression de toute interactivité css
        this.display.style.pointerEvents = 'none';
    }


    // 5 - clear néttoyage final
    clear() {
        // arret d'audio par exemple
    }


}