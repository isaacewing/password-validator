import type { GenerateOptions } from 'randomstring';
import randomInteger            from 'random-int';
import objectHash               from 'object-hash';
import { generate }             from 'randomstring';
import { Md5 }                  from 'ts-md5';

/**
 *
 * @class UtilTool
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 09:11 am
 * @description This class handles storing all the random needed functions used throughout the application
 */
export class UtilTool {
    /**
     *
     * @type {string}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     */
    //protected static readonly CONSOLE_PREFIX: string     = '[] UTIL []';
    /**
     *
     * @type {boolean}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     */
    //protected static readonly CONSOLE_ENABLED: boolean   = false;
    /**
     *
     * @type {number}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     */
    protected static readonly DEFAULT_RANDOM_MIN: number = 0;
    /**
     *
     * @type {number}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     */
    protected static readonly DEFAULT_RANDOM_MAX: number = 1;
    /**
     *
     * @type {number}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     */
    protected static readonly DEFAULT_HASH_LENGTH: number = 40;

    /**
     *
     * @param {number} max
     * @return {number}
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     * @see randomString
     * @see UtilTool.genHash
     * @see UtilTool.genUID
     * @see UtilTool.genNum
     */
    public static randomNumber( max?: number ): number;
    public static randomNumber( min?: number, max?: number ): number;
    public static randomNumber( testMin?: number, testMax?: number ): number {
        try{
            return randomInteger( testMin, testMax );
        }catch( exception: unknown ) {
            return Math.round( Math.random() * ( ( testMax ?? UtilTool.DEFAULT_RANDOM_MAX ) - ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN ) ) + ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN ) );
        }
    }

    /**
     *
     * @param {number} max
     * @return {number}
     * @static
     * @public
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     * @see randomString
     * @see UtilTool.genHash
     * @see UtilTool.genUID
     * @see UtilTool.genNum
     */
    public static randomString( max?: number ): number;
    public static randomString( min?: number, max?: number ): number;
    public static randomString( testMin?: number, testMax?: number ): number {
        try {
            const numSeed: number          = Math.random() * ( ( testMax ?? UtilTool.DEFAULT_RANDOM_MAX ) - ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN ) ) + ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN );
            const options: GenerateOptions = {
                length : numSeed,
                charset: 'numeric',
            };

            console.log('__Ut__', {testMin, testMax, numSeed, options, generate:+generate( options )} )

            return +generate( options );
        } catch( exception: unknown ) {
            return Math.random() * ( ( testMax ?? UtilTool.DEFAULT_RANDOM_MAX ) - ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN ) ) + ( testMin ?? UtilTool.DEFAULT_RANDOM_MIN );
        }
    }

    /**
     *
     * @param {number} length
     * @return {string}
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 09/30/24 09:11 am
     * @see randomString
     * @see UtilTool.genHash
     * @see UtilTool.genUID
     * @see UtilTool.genNum
     * @example
     * UtilTool.genHash();
     * // 278e5b41699dacaaaacc187a5fa79f4b5dc78afb
     * // 681c2dff5ac09f2a88ff426062c1e36e95e94156
     * // e7809305f4a0fac4e7964071108e3448f619bfdd
     * // 91239d14e24daf669ed96d178c6a1fe41c70bba8
     * // e7809305f4a0fac4e7964071108e3448f619bfdd
     */
    public static genHash( length?: number ): string {
        try {
            const result: string = objectHash( { name: UtilTool.randomString() } );

            if( length ) {
                return result.slice( 0, length );
            }

            return result;
        } catch( exception: unknown ) {
            const random1: number = Math.random();
            const random2: number = Math.random();
            const string1: string = Md5.hashStr( String( Math.random() * random1 ) ) as string;
            const string2: string = Md5.hashStr( String( Math.random() * random2 ) ) as string;
            const string3: string = string1.concat( string2 ).slice( 0, length ?? +( this.DEFAULT_HASH_LENGTH ?? 0 ) );

            /*
             ConsoleManager.Log( UtilTool.CONSOLE_ENABLED ?? null, UtilTool.CONSOLE_PREFIX ?? null, UtilTool.constructor.name ?? null, 'register hash exception',
             { exception, string1, string2, string3 } );

             */

            return string3;
        }
    }
}