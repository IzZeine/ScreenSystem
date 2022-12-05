import {gsap} from "gsap";
import DemoMainMenu from "./DemoMainMenu";
import ScreenBase from "../../@provided/screen/core/ScreenBase";

export default class DemoIntroScreen extends ScreenBase {

    constructor(params) {
        super(params);

        console.log("TOTO");
    }

    async build(builtCompleteCallback) {
        // build the display of IntroScreen
        this.display.innerHTML = `<h1>IntroScreen</h1>`;
        this.display.style.backgroundColor = '#FF9900';

        console.log("TOTO");

        // then say to ScreenSystem that we are built
        builtCompleteCallback();
    }

    activate(exitCallback) {
        super.activate(exitCallback);


        // dès que l'écran est activé, on lance un tween qui une fois complété sortira de cet écran
        gsap.to(this.display.querySelector('h1'), {
            duration: 2.5, opacity: 0, onComplete: () => {
                this.exitCallback(DemoMainMenu);
            }
        })
    }


}