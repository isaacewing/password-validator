/**
 * @class AObserver
 * @abstract
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 06:09 pm
 */
export abstract class AObserver {
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_PREFIX: string                            = '{{';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_CODE: string                            = 'O';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_POSTFIX: string                            = '}}';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_CLASSIFICATION: string                     = '';
    /**
     *
     * @type {Map<string, Function>}
     * @static
     * @private
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    protected static observers: Map<string, ( data: any ) => void>;

    protected static get consoleSubscribe(): string {
        return `${this.CONSOLE_PREFIX} +${this.CONSOLE_CODE.padEnd(3,' ')} ${this.CONSOLE_POSTFIX}`
    }

    protected static get consoleUnsubscribe(): string {
        return `${this.CONSOLE_PREFIX} -${this.CONSOLE_CODE.padEnd(3,' ')} ${this.CONSOLE_POSTFIX}`
    }

    protected static get consoleNotify(): string {
        return `${this.CONSOLE_PREFIX} >${this.CONSOLE_CODE.padEnd(3,' ')} ${this.CONSOLE_POSTFIX}`
    }

    protected static get consoleError(): string {
        return `${this.CONSOLE_PREFIX} x${this.CONSOLE_CODE.padEnd(3,' ')} ${this.CONSOLE_POSTFIX}`
    }

    protected static get consoleInfo(): string {
        return `${this.CONSOLE_PREFIX} =${this.CONSOLE_CODE.padEnd(3,' ')} ${this.CONSOLE_POSTFIX}`
    }

    protected static get consoleClassification(): string {
        if(this.CONSOLE_CLASSIFICATION === '')
            return  'subscriber';

        return `${this.CONSOLE_CLASSIFICATION} subscriber`;
    }

    /**
     *
     * @param hash {string}
     * @param fn {Function}
     * @return void
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    public static subscribe( hash: string, fn: ( data: any ) => void ): void {
        if(this.observers.has(hash)){
            console.log( `${this.consoleInfo} SKIPPED ${this.consoleClassification}: "${hash}", it was already added`, { observers: this.observers } );
        } else{
            this.observers.set( hash, fn );
            console.log( `${this.consoleSubscribe} ADDED ${this.consoleClassification}: "${hash}", all ${this.consoleClassification}s`, { observers: this.observers } );
        }
    }

    /**
     *
     * @param hash {string}
     * @return void
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    public static unsubscribe( hash: string | null ): void {
        if( hash ) {
            if( this.observers.has( hash ) ) {
                this.observers.delete( hash );
                console.log( `${this.consoleUnsubscribe} REMOVED ${this.consoleClassification}`, hash );
            } else {
                console.log( `${this.consoleError} ERROR removing ${this.consoleClassification}, could not find...`, hash );
            }
        }
    }

    /**
     *
     * @param data {any}
     * @return void
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    public static notify( data: any ): void {
        try {
            console.log( `${this.consoleNotify} >>> com name`, data.constructor.name, data );
            console.trace(data)
        } catch( exception ) {
            console.warn( `${this.consoleNotify} >>> com name`, data?.constructor?.name, data );
        }

        this.observers.forEach( ( fn: ( data: any ) => void, key: string ): void => {
            console.log( `${this.consoleNotify} >>> CALLING: "${key}", function...` );
            fn( data );
        } );
    }

    /**
     * @return {void}
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    public static clear(): void {
        this.observers.clear();
    }

    /**
     *
     * @return {Function[]}
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:09 pm
     */
    public static getAllObservers(): ( ( data: any ) => void )[] {
        return [ ...this.observers.values() ];
    }
}