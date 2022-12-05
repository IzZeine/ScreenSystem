export default class ScreenSystem {

    /**
     *
     * @param {Element} domElement
     * @param {Class} initialScreenConstructor
     * @param {Object} initialScreenParameters
     * @param {Class} transitionConstructor
     * @param {Object} transitionParameters
     */
    constructor(domElement , initialScreenConstructor , initialScreenParameters, transitionConstructor = CutScreenTransition, transitionParameters= {} ) {

        /**
         * @type {Element}
         */
        this.domElement = domElement;


        // remove interactions
        this.domElement.style.pointerEvents = "none";

        /**
         * @type {ScreenBase}
         */
        this.currentScreen = null;

        /**
         * @type {ScreenBase}
         */
        this.previousScreen = null;

        /**
         *
         * @type {Function}
         */
        this.clearHandler = function(screen){};

        /**
         * The transition screen element
         * @type {ScreenTransitionBase}
         */
        this.transition = new transitionConstructor( transitionParameters );

        // on créer une nouvelle instance du initialScreen
        this.setScreen( initialScreenConstructor , initialScreenParameters );
    };


    /**
     *
     * Change the current screen for a new one
     * Phase 1/5 of change screen flow
     *
     * @param newScreenConstructor {Class} Class of new screen to instantiate
     * @param newScreenParams {Object} Parameters for instanciation of the new screen class
     * @param transitionParams {Object} parameters to control transitions
     */
    setScreen ( newScreenConstructor , newScreenParams, transitionParams ){

        if( this.previousScreen ){
            console.warn("ScreenSystem : setScreen() aborted due to previous screen still existing.");
            return;
        }

        // When a change of screen is recorded. Pointers events are deactivated.
        this.domElement.style.pointerEvents = 'none';

        // Lets store the information we will need during the flow of changing screen
        this.previousScreen = this.currentScreen;
        this.currentScreen = null;
        this.newScreenConstructor = newScreenConstructor;
        this.newScreenParams = newScreenParams;
        this.transitionParams = transitionParams;

        // If some previous screen isset
        if( this.previousScreen ){
            // prepare its deactivation

            /**
             * Phase 2/5 of change screen flow
             */
            this.previousScreen.prepareDeactivation( this.previousScreenIsReadyToBeDeactivated.bind(this) );
        }else{
            // Or directly build the new screen
            this.buildNewScene();
        }
    };

    /**
     * Callback that says that previous screen is ready to be deactivated.
     * Phase 2/5 of change screen flow has been confirmed
     */
    previousScreenIsReadyToBeDeactivated(){
        // Deactivate previous screen
        this.previousScreen.deactivate();

        // And build the new one
        this.buildNewScene();
    }

    /**
     * Phase 3/5 of change screen flow
     */
    buildNewScene(){
        // Using the params and the class, build the new screen.
        this.newScreen = new this.newScreenConstructor( this.newScreenParams );
        this.newScreen.build( this.doTransition.bind(this) );
    }

    /**
     * Phase 3/5 of change screen flow has been confirmed
     */
    doTransition(){
        // on ajoute l'élement
        this.domElement.appendChild( this.newScreen.display );

        //Si une transition, on prepare la transition avant de placer l'élément
        if( this.previousScreen ){
            this.transition.prepareTransition( this.previousScreen, this.newScreen, this.transitionParams );
            this.transition.doTransition( this.clearPreviousScreen.bind(this), this.previousScreen, this.newScreen, this.transitionParams );
        }else{
            this.clearPreviousScreen();
        }
    }

    clearPreviousScreen () {
        if( this.previousScreen ) {
            this.domElement.removeChild(this.previousScreen.display);
            this.previousScreen.clear();

            this.clearHandler( this.previousScreen );

            this.previousScreen = null;
        }

        this.newScreen.prepareActivation( this.newScreenIsReadyToBeActivated.bind(this) );
    };

    newScreenIsReadyToBeActivated(){
        this.newScreen.activate( this.setScreen.bind(this) )
        this.domElement.style.pointerEvents = 'all';
        this.currentScreen = this.newScreen;
        this.newScreen = null;
    }

    update( dt ){

        // Update screens ----------------------------------------------------------------------------------------------
        if( this.currentScreen ){
            this.currentScreen.update(dt);
            this.currentScreen.screenUpdate(dt);
        }

        if( this.newScreen ){
            this.newScreen.update(dt);
        }

        if( this.previousScreen ){
            this.previousScreen.update(dt);
        }

    };
}