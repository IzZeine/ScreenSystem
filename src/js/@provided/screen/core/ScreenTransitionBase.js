/**
 * This class define the way a screentransition interacts with screen system
 */
export default class ScreenTransitionBase {

    /**
     * @param {Object} parameters
     */
    constructor( parameters ) {
        // Constructor let to your desire
    }

    /**
     *
     * Prepare screen and things before the execution of the transition
     *
     * @param {ScreenBase} previousScreen
     * @param {ScreenBase} nextScreen
     * @param {Object} transitionParameters
     */
    prepareTransition(previousScreen, nextScreen, transitionParameters = {}){
        // Let to your imagination
    }

    /**
     *
     * Prepare screen and things before the execution of the transition
     *
     * @param {Function} completeCallback to be executed when animation is over
     * @param {ScreenBase} previousScreen
     * @param {ScreenBase} nextScreen
     * @param {Object} transitionParameters
     */
    doTransition(completeCallback, previousScreen, nextScreen, transitionParameters = {}){
        // let to you imagination
    }
}