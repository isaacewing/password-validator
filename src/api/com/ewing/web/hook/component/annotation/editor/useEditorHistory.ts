import type { AnnotationState }                      from '@markerjs/markerjs3';
import type { LocalStorageOptions }                  from 'use-local-storage-state';
import type { EditorHistoryState, EditorImageState } from '../../../../type';
import { useEffect }                                 from 'react';
import { default as useStorageState }                from 'use-local-storage-state';
import { IdentityConfig }                            from '../../../../config';
//import { EditorHistoryEnum }                       from '../../../../enum';

/**
 *
 * @param {EditorHistoryProps | null} props
 * @returns {[AnnotationState, (props: EditorHistoryProps) => void]}
 * @author Isaac Ewing
 * @version 1.0.0 10/06/24 08:39 am
 */
export function useEditorHistory( props:AnnotationState | null):[ history:AnnotationState, ( props: AnnotationState ) => void ]{
    const CONFIG_COMPONENT_ID:string                           = IdentityConfig.hookComAnnotationEditorHistoryId;
    const CONFIG_COMPONENT_EDITOR_IMAGE:string                 = IdentityConfig.hookComAnnotationEditorImageId;
    const CONFIG_CONSOLE_CODE:string                           = IdentityConfig.hookComAnnotationEditorHistoryCode;
    const DEFAULT_ANNOTATION_VERSION:number                    = 3;
    const defaultState:LocalStorageOptions<EditorHistoryState> ={
        defaultValue:new Map(),
        serializer:{
            stringify:( map ):string => JSON.stringify( Array.from( (map as EditorHistoryState).entries() ) ),
            parse:  ( map: string ):EditorHistoryState => new Map( JSON.parse( map ) ),
        },
    }
    const [ storedHistory, storeHistory ]                      = useStorageState<EditorHistoryState>( CONFIG_COMPONENT_ID, defaultState );
    const [ storedImage ]                                      = useStorageState<EditorImageState>( CONFIG_COMPONENT_EDITOR_IMAGE );
    /*
    const [ history ]                                          = useState<AnnotationState>( storedHistory?.get( storedImage?.hash ) ?? null );
    const [ image, setImage ]                                  = useState<string>( storedImage?.hash ?? null ); // use image hash as image
    const [ hash, setHash ]                                    = useState<string>(storedImage?.hash ?? null );

     */
    const setHistory = (props:AnnotationState):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setHistory started...`, {old:{ ...storedHistory}, new: {...props}});
        console.log(`${CONFIG_CONSOLE_CODE} setHistory working...`, {hash:storedImage?.hash ?? null });
        console.log(`${CONFIG_CONSOLE_CODE} setHistory working...`, {old:{...storedHistory.get(storedImage?.hash)}, });

        if(JSON.stringify(storedHistory.get(storedImage?.hash)) !== JSON.stringify(props)){
            const updatedState:EditorHistoryState = new Map( storedHistory);

            updatedState.set(storedImage?.hash, props);
            storeHistory(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} setHistory done...`, {old:{ ...storedHistory}, new: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setHistory skipped, already current...`, {old:{ ...storedHistory.get(storedImage?.hash)}, new: {...props}});
        }
    }
    /*
    const updateHistory = (props:EditorHistoryProps):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setHistory started...`, { ...props } );

        if(props.action === EditorHistoryEnum.Add){
            addHistory(props.data);
            console.log(`${CONFIG_CONSOLE_CODE} setHistory done...`, { ...props } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setHistory skipped, ${props.action} not supported...`, { ...props } );
        }
    }

     */

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] started...`,  { storedImage, hash, image } );

        if(storedImage){
            if(storedImage.hash !== hash){
                setImage(storedImage.hash)
                setHash(storedImage.hash);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] done...`,  { storedImage, hash, image } );
            }else{
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] skipped, already saved...`, { storedImage, hash, image } );
            }
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] skipped, storedImage null...`, { storedImage, hash, image } );
        }
    }, [ storedImage ] );

     */

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedHistory] started...`,  { storedHistory } );

        if(storedHistory){
            if(hash ?? storedImage.hash){
                setHistory(storedHistory.get(hash ?? storedImage.hash));
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedHistory] done...`,  { storedHistory } );
            }else{
                console.error(`${CONFIG_CONSOLE_CODE} useEffect[storedHistory] skipped, hash null...`, { hash, storedImage } );
            }
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedHistory] skipped, storedHistory null...`, { storedHistory } );
        }
    }, [ storedHistory ] );

     */

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] started...`,  { storedImage} );

        if(storedImage?.hash){
            if(!storedHistory.get(storedImage?.hash)){
                const image = new Image();
                console.warn(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] working...`,  { image } );

                image.src = storedImage?.location;
                image.onload = ():void => {
                    const oldHistory:AnnotationState = storedHistory.get(storedImage?.hash) ?? null;

                    if(oldHistory === null || oldHistory?.width === -1) {
                        const updatedState:EditorHistoryState=new Map( storedHistory );
                        const newHistory:AnnotationState = {
                            version: oldHistory?.version ?? DEFAULT_ANNOTATION_VERSION,
                            width: image?.width ?? -1,
                            height:image?.height ?? -1,
                            markers: oldHistory?.markers ?? [],
                        }

                        updatedState.set(storedImage?.hash, newHistory);
                        storeHistory(updatedState);
                        console.log(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] done...`,  { newHistory } );
                    }
                }
                console.warn(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] waiting...`);
            }else{
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] skipped, storedHistory current...`);
            }
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[ storedImage ] skipped, storedImage null...`, { storedImage} );
        }
    }, [ storedImage ] );

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { ...props, hash:storedImage?.hash } );

        if(props){
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { props, hash:storedImage?.hash } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { props, hash:storedImage?.hash } );
        }
    }, [ props ] );

    return [storedHistory?.get( storedImage?.hash ) ?? null, setHistory];
}