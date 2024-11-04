import type { IObserver }             from '../interface';
import type { SidebarButtonObserver } from '../type';
import { AObserver }                  from '../abstract';

/**
 * @class SidebarObserver
 * @extends AObserver
 * @implements IObserver
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 06:41 pm
 */
export class SidebarObserver extends AObserver implements IObserver {
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    //protected static readonly CONSOLE_PREFIX: string                            = '{{';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_CODE: string                            = 'Sb';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    //protected static readonly CONSOLE_POSTFIX: string                            = '}}';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static readonly CONSOLE_CLASSIFICATION: string                     = 'sidebar';
    /**
     *
     * @type {Map<string, Function>}
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     */
    protected static observers: Map<string, ( data: SidebarButtonObserver ) => void> = new Map<string, ( data: SidebarButtonObserver ) => void>();

    /**
     *
     * @param hash {string}
     * @param fn {Function}
     * @return void
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 06:41 pm
     *//*
    public static subscribe( hash: string | null, fn: ( data: SidebarButtonObserver ) => void ): void {
        if( hash ) {
            this.observers.set( hash, fn );
            console.log( `${ this.CONSOLE_PREFIX } ADDED sidebar subscriber`, hash, 'all sidebar subscribers', { observers: this.observers } );
        }
    }
    */
}
