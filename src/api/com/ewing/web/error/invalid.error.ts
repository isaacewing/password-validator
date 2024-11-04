import { AError }      from '../abstract';
import { InvalidEnum } from '../enum';

/**
 *
 * @class InvalidError
 * @extends AError<InvalidEnum>
 * @extends Error
 * @author Isaac Ewing
 * @version 1.0.0 08/13/23 09:26 am
 */
export class InvalidError extends AError<InvalidEnum> {
    /**
     *
     * @throws {Error} Throws the custom error message
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:26 am
     * @see invalidURL
     * @see invalidLink
     * @see invalidToken
     * @see invalidDirectory
     */
    public static invalidURL() {
        throw new Error( this.buildInvalid( InvalidEnum.URL ) );
    }

    /**
     * @return {void}
     * @throws {Error} Throws the custom error message
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:26 am
     * @see invalidURL
     * @see invalidLink
     * @see invalidToken
     * @see invalidDirectory
     */
    public static invalidLink(): void {
        throw new Error( this.buildInvalid( InvalidEnum.Link ) );
    }

    /**
     *
     * @return {InvalidError}
     * @throws {InvalidError} Throws the custom exception with specialized exception name and message
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:26 am
     * @see invalidURL
     * @see invalidLink
     * @see invalidToken
     * @see invalidDirectory
     */
    public static invalidToken(): InvalidError {
        return new InvalidError( InvalidEnum.Token, 'The token is invalid, corrupt or the encryption key changed' );
    }

    /**
     *
     * @param {string} [directory=null]
     * @return {InvalidError}
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 08/13/23 09:26 am
     * @see invalidURL
     * @see invalidLink
     * @see invalidToken
     * @see invalidDirectory
     */
    public static invalidDirectory( directory?: string ): InvalidError {
        if( directory ) {
            return new InvalidError( InvalidEnum.Directory, `The directory [ ${ directory } ] is invalid and cannot be used or does not exist...` );
        }

        return new InvalidError( InvalidEnum.Directory, 'The directory is invalid and cannot be used or does not exist...' );
    }
}