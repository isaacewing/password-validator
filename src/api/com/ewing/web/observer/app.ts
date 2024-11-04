import type { IObserver }      from '../interface';
import type { AppActionProps } from '../type';
import { AObserver }           from '../abstract';

/**
 * @class AppObserver
 * @extends AObserver
 * @implements IObserver
 * @author Isaac Ewing
 * @version 1.0.0 10/02/24 12:12 pm
 */
export class AppObserver extends AObserver implements IObserver {
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 12:12 pm
     */
    protected static readonly CONSOLE_PREFIX: string                             = '< ';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 12:12 pm
     */
    protected static readonly CONSOLE_CODE: string                               = 'App';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 12:12 pm
     */
    protected static readonly CONSOLE_POSTFIX: string                            = '/>';
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 12:12 pm
     */
    protected static readonly CONSOLE_CLASSIFICATION: string                  = 'app';
    /**
     *
     * @type {Map<string, Function>}
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 12:12 pm
     */
    protected static observers: Map<string, ( data: AppActionProps ) => void> = new Map<string, ( data: AppActionProps ) => void>();
}
