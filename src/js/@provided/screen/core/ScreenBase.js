export default class ScreenBase{
    constructor( params ){
        this.data = params;

        /**
         * @type {HTMLElement}
         */
        this.display = document.createElement('div');
        this.display.classList.add("screen");
        this.display.classList.add("screen--default");
    }

    /**
     * Built this screen using anything and also loaded resources
     * @param {Function} builtCompleteCallback The callback to inform built has been completed
     */
    async build( builtCompleteCallback ){
        throw Error("This is an abstract method that should be overriden");
    }


    /**
     * This update method is called on every frame as soon this screen is DISPLAYED.
     * Even when not already / not anymore "activated"
     * It can then be used to perform graphics render loop and other steps that are NOT critically requiring that :
     *      - this screen is currently activated
     *
     * @param {Number} dt The elapsed delta time
     */
    update(dt){}

    /**
     * This screen can now become active. Lets prepare its activation
     * It will become active as soon as the callback will be executed
     *
     * @param {Function} preparationCompleteCallback
     */
    prepareActivation( preparationCompleteCallback ){
        preparationCompleteCallback();
    }

    /**
     *
     * This screen will now be active.
     * Do some stuff to make it active.  ie: AddEventListener is now a good choice
     *
     * @param {Function} exitCallback The function to move to another screen
     *
     */
    activate( exitCallback ){
        this.exitCallback = exitCallback;
    }

    /**
     * This update method is called on every frame as soon this screen is ACTIVATED.
     * It can then be used to perform steps that critically requiring that :
     *      - this screen is currently activated
     *
     * Such as mechanics, time counter, etc..
     *
     * @param {Number} dt The elapsed delta time
     */
    screenUpdate(dt){

    }

    /**
     * This screen can new become deactivated.
     * It will become deactivated as soon as the callback will be executed.
     *
     * Do some stuff toi make it inactive. ie: RemoveEventListener is now a good choice
     *
     * @param {Function} preparationCompleteCallback
     */
    prepareDeactivation( preparationCompleteCallback ){
        preparationCompleteCallback();
    }

    /**
     * This screen has now be deativated.
     * Do some stuff if needed.
     */
    deactivate(){
        // do some deactivation stuff
    }


    clear() {
        // cleanup screen after out transition done
    }
}