import '../css/app.css'
import CutScreenTransition from "./@demo/transition/CutScreenTransition";
import ScreenSystem from "./@provided/screen/core/ScreenSystem";
import DemoIntroScreen from "./@demo/screen/DemoIntroScreen";



// récupération du container html
const screenSystemContainer = document.querySelector('#application_container');


// démarrage du screen system
const screenSys = new ScreenSystem(
    screenSystemContainer,  // container html ou le screen system va s'afficher
    DemoIntroScreen,  // constructueur premier écran
    {},  // parametre de constructeur premier écran
    CutScreenTransition //construceur moteur de transition
    );

/***********************************************************************************************************************
 * MAIN APPLICATION LOOP
 **********************************************************************************************************************/
let lastTime = new Date().getTime();
const mainLoop = function () {

    // Calcul du delta time
    let newTime = new Date().getTime();
    let dt = newTime - lastTime;

    lastTime = newTime;

    // Mise à jour du screen system
    screenSys.update(dt);


    // keep runing the main loop
    requestAnimationFrame(mainLoop);
};
requestAnimationFrame(mainLoop);
