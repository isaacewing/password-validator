import type { LocalStorageOptions }                     from 'use-local-storage-state';
import type {
    ShapePanelState, ShapeStrokeProps, SidebarState,
}                                                       from '../../../../type';
import { useEffect }                                    from 'react';
import { default as useStorageState }                   from 'use-local-storage-state';
import { IdentityConfig }                               from '../../../../config';
import { ShapeStrokeStyleEnum, SidebarButtonShapeEnum } from '../../../../enum';

export function useEditorAppearance( props: ShapeStrokeProps | null):[ stroke:ShapeStrokeProps, ( props: Partial<ShapeStrokeProps>, shape?:SidebarButtonShapeEnum ) => ShapeStrokeProps | void ]{
    const CONFIG_COMPONENT_ID:string                        = IdentityConfig.hookComAnnotationEditorAppearanceId;
    const CONFIG_COMPONENT_SIDEBAR_ID: string               = IdentityConfig.hookComNavSidebarId;
    const CONFIG_CONSOLE_CODE:string                        = IdentityConfig.hookComAnnotationEditorAppearanceCode;
    const DEFAULT_STROKE_COLOR:string                       = '#336699';
    const DEFAULT_STROKE_WIDTH:number                       = 3;
    const DEFAULT_STROKE_STYLE:ShapeStrokeStyleEnum         = ShapeStrokeStyleEnum.Normal;
    const DEFAULT_FILL_COLOR:string                         = '#cccccc';
    const DEFAULT_FILL_OPACITY:number                       = 80;
    const defaultState:LocalStorageOptions<ShapePanelState> ={
        defaultValue:new Map( [
                                  [
                                      SidebarButtonShapeEnum.Other, {
                                      strokeColor: DEFAULT_STROKE_COLOR,
                                      strokeWidth: DEFAULT_STROKE_WIDTH,
                                      strokeStyle: DEFAULT_STROKE_STYLE,
                                      fillColor  : DEFAULT_FILL_COLOR,
                                      fillOpacity: DEFAULT_FILL_OPACITY,
                                  } ],
                                  [
                                      SidebarButtonShapeEnum.Select, {
                                      strokeColor: DEFAULT_STROKE_COLOR,
                                      strokeWidth: DEFAULT_STROKE_WIDTH,
                                      strokeStyle: DEFAULT_STROKE_STYLE,
                                      fillColor  : DEFAULT_FILL_COLOR,
                                      fillOpacity: DEFAULT_FILL_OPACITY,
                                  } ] ] ),
        serializer:{
            stringify:( map ):string => JSON.stringify( Array.from( (map as ShapePanelState).entries() ) ),
            parse:  ( map: string ):ShapePanelState => new Map( JSON.parse( map ) ),
        },
    }
    const [ storedShapeStroke, storeShapeStroke ]           = useStorageState<ShapePanelState>( CONFIG_COMPONENT_ID, defaultState);
    const [ storedShape ]                                   = useStorageState<SidebarState>(CONFIG_COMPONENT_SIDEBAR_ID);
    //const [ shape, setShape ]                               = useState<SidebarButtonShapeEnum>( storedShape?.shape ?? null );
    /*
    const [ strokeColor, setStrokeColor ]                   = useState<string>( storedShapeStroke?.get( storedShape?.shape )?.strokeColor ?? null );
    const [ strokeWidth, setStrokeWidth ]                   = useState<number>( storedShapeStroke?.get( storedShape?.shape )?.strokeWidth ?? null );
    const [ strokeStyle, setStrokeStyle ]                   = useState<ShapeStrokeStyleEnum>( storedShapeStroke?.get( storedShape?.shape )?.strokeStyle ?? null );
    const [ fillColor, setFillColor ]                       = useState<string>( storedShapeStroke?.get( storedShape?.shape )?.fillColor ?? null );
    const [ fillOpacity, setFillOpacity ]                   = useState<number>( storedShapeStroke?.get( storedShape?.shape )?.fillOpacity ?? null );
    const getShapeStroke = (shape:SidebarButtonShapeEnum):ShapeStrokeProps | null => {
        switch(shape){
            case SidebarButtonShapeEnum.Other:
            case SidebarButtonShapeEnum.Select:
                return null;
            default:
                return storedShapeStroke?.get( shape) ?? setShapeDefaults(shape);
        }
    }
    */
    const setShapeDefaults = (shape:SidebarButtonShapeEnum):ShapeStrokeProps => {
        console.log(`${CONFIG_CONSOLE_CODE} setShapeDefault started...`, {shape,appearance:storedShapeStroke?.get(shape) ?? null});

        const updatedState:ShapePanelState=new Map( storedShapeStroke);
        const defaults:ShapeStrokeProps = {
            strokeColor: DEFAULT_STROKE_COLOR,
            strokeWidth: DEFAULT_STROKE_WIDTH,
            strokeStyle: DEFAULT_STROKE_STYLE,
            fillColor  : DEFAULT_FILL_COLOR,
            fillOpacity: DEFAULT_FILL_OPACITY,
        };

        updatedState.set(shape, defaults);
        storeShapeStroke(updatedState);
        console.log(`${CONFIG_CONSOLE_CODE} setShapeDefault done...`, {shape,appearance:updatedState?.get(shape)});

        return defaults;
    }
    const setAppearance         = (props:Partial<ShapeStrokeProps>, shape?:SidebarButtonShapeEnum):ShapeStrokeProps | void => {
        console.log(`${CONFIG_CONSOLE_CODE} setAppearance started...`, {old:{ ...storedShapeStroke?.get( storedShape?.shape )}, new: {...props}});

        if(shape){
            console.warn(`${CONFIG_CONSOLE_CODE} setAppearance working...`, {shape});
            const defaults = setShapeDefaults(shape);
            console.warn(`${CONFIG_CONSOLE_CODE} setAppearance done...`, {shape});

            return defaults;
        }else{
            const localState:ShapePanelState=new Map( storedShapeStroke);
            const updatedState:ShapeStrokeProps={
                ...localState.get(storedShape.shape),
                ...props
            }

            console.warn(`${CONFIG_CONSOLE_CODE} setAppearance working...`, {shape:storedShape?.shape ?? null});

            if(JSON.stringify(storedShapeStroke?.get( storedShape?.shape )) !== JSON.stringify(updatedState)){
                localState.set( storedShape?.shape, updatedState );
                storeShapeStroke(localState);
                console.log(`${CONFIG_CONSOLE_CODE} setAppearance done...`, {old:{ ...storedShapeStroke?.get( storedShape?.shape )}, new: {...updatedState}});
            }else{
                console.log(`${CONFIG_CONSOLE_CODE} setAppearance skipped, already current...`, {old:{ ...storedShapeStroke?.get( storedShape?.shape )}, new: {...props}});
            }
        }
    }

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShapeStroke] started...`, {action:storedShape?.shape, storedShapeStroke});

        if(storedShapeStroke){
            const shapeStroke:ShapeStrokeProps | null = getShapeStroke(storedShape?.shape);

            setStrokeColor( shapeStroke?.strokeColor ?? null );
            setStrokeWidth( shapeStroke?.strokeWidth ?? null );
            setStrokeStyle( shapeStroke?.strokeStyle ?? null );
            setFillColor( shapeStroke?.fillColor ?? null );
            setFillOpacity( shapeStroke?.fillOpacity ?? null );
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShapeStroke] done...`, {action:storedShape?.shape, storedShapeStroke, strokeColor, strokeWidth, strokeStyle, fillColor, fillOpacity});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShapeStroke] skipped, storedShapeStroke null...`, {action:storedShape?.shape, storedShapeStroke});
        }
    }, [storedShapeStroke] );

     */

    /*
    useEffect(():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] started...`, {storedShape, shape});

        if(storedShape?.shape){
            setShape(storedShape.shape);
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] done...`, {storedShape, shape});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] skipped, storedShape null...`, {storedShape, shape});
        }
    }, [storedShape]);

     */

    /*
    useEffect(():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, {props, stored:{strokeColor, strokeWidth, strokeStyle}});

        if(props){
            const merged:ShapeStrokeProps = {
                strokeColor,
                strokeWidth,
                strokeStyle,
                fillColor,
                fillOpacity,
                ...props,
            };

            if(strokeColor !== merged.strokeColor){
                setStrokeColor(merged.strokeColor);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: strokeColor, new: merged.strokeColor } );
            }
            if(strokeWidth !== merged.strokeWidth){
                setStrokeWidth(merged.strokeWidth);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: strokeWidth, new: merged.strokeWidth } );
            }
            if(strokeStyle !== merged.strokeStyle){
                setStrokeStyle(merged.strokeStyle);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: strokeStyle, new: merged.strokeStyle } );
            }
            if(fillColor !== merged.fillColor){
                setFillColor(merged.fillColor);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: fillColor, new: merged.fillColor } );
            }
            if(fillOpacity !== merged.fillOpacity){
                setFillOpacity(merged.fillOpacity);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: fillOpacity, new: merged.fillOpacity } );
            }

            const updatedState:ShapePanelState=new Map( storedShapeStroke)

            updatedState.set(shape ?? storedShape.shape, merged)
            storeShapeStroke(updatedState)
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, {stored: {...merged}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, {props, stored:{strokeColor, strokeWidth, strokeStyle}});
        }
    }, [props]);

     */

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] started...`, {shape:storedShape?.shape, appearance:storedShapeStroke?.get(storedShape?.shape)});

        if(storedShape && !storedShapeStroke.has( storedShape.shape )){
            setShapeDefaults(storedShape.shape);
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] done...`, {shape:storedShape?.shape, appearance:storedShapeStroke?.get(storedShape?.shape)});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] skipped, already current...`, {shape:storedShape?.shape, appearance:storedShapeStroke?.get(storedShape?.shape)});
        }
    }, [storedShape] );

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { old:{ ...storedShapeStroke?.get( storedShape?.shape ) } } );
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] working...`, { shape:storedShape?.shape } );
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] working...`, { props, ...props } );
        //console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] working, trace props...` );
        //console.trace(props)

        if(props){
            setAppearance( props );
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old:{ ...storedShapeStroke?.get( storedShape?.shape ) }, new:{ ...props } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { old:{ ...storedShapeStroke?.get( storedShape?.shape ) } } );
        }
    }, [ props ] );

    return [ storedShapeStroke?.get( storedShape?.shape ) ?? null, setAppearance ];
}