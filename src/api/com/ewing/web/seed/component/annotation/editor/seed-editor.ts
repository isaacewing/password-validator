/**
 *
 * @class SeedWithAvatar
 * @author Isaac Ewing
 * @version 1.0.0 10/02/24 03:02 pm
 */
export class SeedEditor {
    /**
     *
     * @type {{ file: string; name: string }[]}
     * @readonly
     * @static
     * @protected
     * @author Isaac Ewing
     * @version 1.0.0 10/02/24 03:02 pm
     */
    protected static readonly DEFAULT_DEMO_IMAGES:{ file: string; name: string }[] = [
        {
            name: 'building perspective',
            file: 'building-01.png',
        },
        {
            name: 'PCB board',
            file: 'pcb-01.png',
        },
        {
            name: 'planetary rings',
            file: 'rings-01.png',
        },
        {
            name: 'shipping dock',
            file: 'shipping-01.png',
        },
        {
            name: 'shipping isometric',
            file: 'shipping-02.png',
        },
        {
            name: 'aerial shipping',
            file: 'shipping-03.png',
        },
        {
            name: 'stocked warehouse',
            file: 'warehouse-01.png',
        },
        {
            name: 'london map',
            file: 'map-01.png',
        },
    ];

    /**
     *
     * @return {{ file: string; name: string }[]}
     * @readonly
     * @static
     * @public
     * @author Isaac Ewing
     * @version 10/02/24 03:02 pm
     * @see SeedEditor.demoImages
     */
    public static get demoImages():{ file: string; name: string }[] {
        return this.DEFAULT_DEMO_IMAGES;
    }
}