/**
 * CutScreenTransition is the default implementation of ScreenTransitionBase
 * It allows the core system to runs as if a ScreenTransitionBase was defined
 * But transitions are "cut"
 */
import ScreenTransitionBase from "../../@provided/screen/core/ScreenTransitionBase";

export default class CutScreenTransition extends ScreenTransitionBase{

    constructor(parameters) {
        super(parameters);
    }

    /**
     * @inheritDoc
     */
    prepareTransition(previousScreen, nextScreen, transitionParameters = {}) {
        // no prepartion needed for cut screen
    }

    /**
     * Simply "Cut" the transition between screens
     *
     * @inheritDoc
     * */
    doTransition(completeCallback, previousScreen, nextScreen, transitionParameters = {}) {
        // It means execute its callback directly to prevent the screen system its done
        completeCallback();
    }
}