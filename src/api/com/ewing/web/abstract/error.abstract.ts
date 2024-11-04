/**
 * @class AError
 * @extends Error
 * @abstract
 * @author Isaac Ewing
 * @version 1.0.0 08/13/23 09:21 am
 */
export abstract class AError<T extends string> extends Error {
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static readonly KEY_NAME: string = 'name';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static readonly KEY_MESSAGE: string = 'message';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static readonly KEY_STACK: string = 'stack';
    /**
     *
     * @type {Map<string, any>}
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected _data: Map<string, any> = new Map<string, any>();

    /**
     *
     * @param property {string} The property or properties that are missing
     * @return {string} Returns a formatted statement
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static buildInvalid( property: string ): string;
    protected static buildInvalid( property: string ): string;
    protected static buildInvalid( properties: string[] ): string;
    protected static buildInvalid( values: string | string[] ): string {
        if( Array.isArray( values ) ) {
            return `Invalid: [ ${ values.join( ', ' ) } ], wrong values specified...`;
        } else {
            return `Invalid: ${ values }, wrong value specified...`;
        }
    }

    /**
     *
     * @param property {string} The property or properties that are missing
     * @return {string} Returns a formatted statement
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static buildMissing( property: string ): string;
    protected static buildMissing( properties: string[] ): string;
    protected static buildMissing( values: string | string[] ): string {
        if( Array.isArray( values ) ) {
            return `Missing: [ ${ values.join( ', ' ) } ], no values specified...`;
        } else {
            return `Missing: ${ values }, no value specified...`;
        }
    }

    /**
     *
     * @param property {string | string[]} The property or properties that are missing
     * @return {string} Returns a formatted statement
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected static buildOverride( property: string ): string;
    protected static buildOverride( method: string, property: string ): string;
    protected static buildOverride( method: string, properties: string[] ): string;
    protected static buildOverride( propOrMethod: string, properties?: string | string[] ): string {
        if( Array.isArray( properties ) ) {
            return `Override: ${ propOrMethod }([ ${ properties.join( ', ' ) } ]}, method must have an override...`;
        } else if( properties ) {
            return `Override: ${ propOrMethod }([ ${ properties } ]}, method must have an override...`;
        } else {
            return `Override: ${ propOrMethod }, property must have an override...`;
        }
    }

    /**
     *
     * @param {<T>} name
     * @param {string} message
     * @param {string} stack
     * @protected
     * @constructor
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     */
    protected constructor( name: T, message?: string, stack?: string ) {
        super( message );

        this.name = name;
        this.message = message;
        this.stack2 = stack;

    }

    /**
     *
     * @returns {<T>} Returns the stored name (nested inside data var, not inherited property)
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public get name(): T {
        return this._data.get( AError.KEY_NAME );
    }

    /**
     *
     * @param {<T>} value
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public set name( value: T ) {
        this._data.set( AError.KEY_NAME, value );
    }

    /**
     *
     * @returns {string}
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public get message(): string {
        return this._data.get( AError.KEY_MESSAGE );
    }

    /**
     *
     * @param {string} value
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public set message( value: string | undefined ) {
        this._data.set( AError.KEY_MESSAGE, value );
    }

    /**
     *
     * @returns {string}
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public get stack2(): string {
        return this._data.get( AError.KEY_STACK );
    }

    /**
     *
     * @param {string} value
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:21 am
     * @see name
     * @see message
     * @see stack
     */
    public set stack2( value: string | undefined ) {
        this._data.set( AError.KEY_STACK, value );
    }
}