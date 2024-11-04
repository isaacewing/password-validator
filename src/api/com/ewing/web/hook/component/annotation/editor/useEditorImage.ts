import type { LocalStorageOptions }   from 'use-local-storage-state';
import type {
    EditorImageState, WithAvatarDataProps
}                                     from '../../../../type';
import { useEffect  }                 from 'react';
import { Md5 }                        from 'ts-md5';
import { default as useStorageState } from 'use-local-storage-state';
import { IdentityConfig }             from '../../../../config';
import { SeedEditor }                 from '../../../../seed';
import { UtilTool }                   from '../../../../tool';

export function useEditorImage( props: EditorImageState | null):[ image:EditorImageState, ( props?: Partial<EditorImageState> ) => void, () => WithAvatarDataProps[] ]{
    const CONFIG_COMPONENT_ID:string                         = IdentityConfig.hookComAnnotationEditorImageId;
    const CONFIG_CONSOLE_CODE:string                         = IdentityConfig.hookComAnnotationEditorImageCode;
    const DEFAULT_IMAGES: { file: string; name: string }[]   = SeedEditor.demoImages;
    const DEFAULT_IMAGE_INDEX:number                         = Math.round( UtilTool.randomNumber( 1, DEFAULT_IMAGES.length ) ) - 1;
    const DEFAULT_IMAGE_FULL:string                          = 'full';
    const DEFAULT_IMAGE_AVATAR:string                        = 'avatar';
    const DEFAULT_IMAGE_PATH:string                          = 'https://www.isaacewing.com/agility-robotics/images';
    const defaultState:LocalStorageOptions<EditorImageState> = {
        defaultValue: {
            index   : DEFAULT_IMAGE_INDEX,
            file    : `${ DEFAULT_IMAGES[ DEFAULT_IMAGE_INDEX ].file }`,
            hash    : `image-${ Md5.hashStr( `${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_FULL }/${ DEFAULT_IMAGES[ DEFAULT_IMAGE_INDEX ].file }` ) }`,
            avatar  : `${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_AVATAR }/${ DEFAULT_IMAGES[ DEFAULT_IMAGE_INDEX ].file }`,
            location: `${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_FULL }/${ DEFAULT_IMAGES[ DEFAULT_IMAGE_INDEX ].file }`,
        },
    }
    const [storedImage,storeImage]                           = useStorageState<EditorImageState>( CONFIG_COMPONENT_ID, defaultState);
    /*
    const [index, setIndex]                                  = useState<number>( storedImage?.index ?? null );
    const [file, setFile]                                    = useState<string>( storedImage?.file ?? null );
    const [hash, setHash]                                    = useState<string>( storedImage?.hash ?? null );
    const [avatar, setAvatar]                                = useState<string>( storedImage?.avatar ?? null );
    const [location, setLocation]                            = useState<string>( storedImage?.location ?? null );

     */
    /*
    const getNewIndex = ():number => {
        console.log(`${CONFIG_CONSOLE_CODE} getNewIndex started...`, { old: index } );

        const newIndex: number = Math.round( UtilTool.randomNumber( 1, DEFAULT_IMAGES.length ) );
        
        if (newIndex === index) {
            console.log(`${CONFIG_CONSOLE_CODE} getNewIndex rerunning, same index...`, { old: index, new: newIndex } );
            return getNewIndex();
        }

        console.log(`${CONFIG_CONSOLE_CODE} getNewIndex done...`, { old: index, new: newIndex } );

        return newIndex;
    }

     */
    const getAllUserImages                                   = ():WithAvatarDataProps[] => {
        return DEFAULT_IMAGES.map((image, id):WithAvatarDataProps => {
            return {
                id,
                name:image.name,
                avatar:`${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_AVATAR }/${ image.file }`,
            }
        })
    }
    const setImage                                           = (props?:Partial<EditorImageState>):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setImage started...`, {old:{ ...storedImage}, new: {...props}});

        const images:string[]               = DEFAULT_IMAGES.map( image => image.file )
        const index:number                  = images.indexOf(props.file);
        const updatedIndex:number           = (index ?? 0) !== -1 ? index : 0;
        const updatedLocation:string        = `${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_FULL }/${ DEFAULT_IMAGES[ updatedIndex ].file }`;
        const updatedState:EditorImageState = {
            index: updatedIndex,
            file: DEFAULT_IMAGES[ updatedIndex ].file,
            hash: `image-${ Md5.hashStr( updatedLocation ) }`,
            avatar: `${ DEFAULT_IMAGE_PATH }/${ DEFAULT_IMAGE_AVATAR }/${ DEFAULT_IMAGES[ updatedIndex ].file }`,
            location: updatedLocation,
        };

        if(JSON.stringify(storedImage) !== JSON.stringify(updatedState)){
            storeImage(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} setImage done...`, {old:{ ...storedImage}, new: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setImage skipped, already current...`, {old:{ ...storedImage}, new: {...props}});
        }
    }

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] started...`,  { storedImage, image:{ index, file, hash, avatar, location } } );
        
        if(storedImage){
            if(storedImage.hash !== hash){
                setIndex(storedImage.index);
                setFile(storedImage.file);
                setHash(storedImage.hash);
                setAvatar(storedImage.avatar);
                setLocation(storedImage.location);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] done...`,  { storedImage, image:{ index, file, hash, avatar, location } } );
            }else{
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] skipped, already saved...`, { storedImage, image:{ index, file, hash, avatar, location } } );
            }
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedImage] skipped, storedImage null...`, { storedImage, image:{ index, file, hash, avatar, location } } );
        }
    }, [ storedImage ] );

     */

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { ...props, index, file, hash, avatar, location } );
        
        if(props?.file){
            const updatedState:EditorImageState = {
                index,
                file,
                hash,
                avatar,
                location,
                ...props,
            };

            // TODO: need to move this into function like setImage, props should pull image then generate the props for it
            if(index !== updatedState.index){
                setIndex(updatedState.index);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] updated props[index]...`, { old: index, new: updatedState.index } );
            }
            if(file !== updatedState.file){
                setFile(updatedState.file);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] updated props[file]...`, { old: file, new: updatedState.file } );
            }
            if(hash !== updatedState.hash){
                setHash(updatedState.hash);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] updated props[hash]...`, { old: hash, new: updatedState.hash } );
            }
            if(avatar !== updatedState.avatar){
                setAvatar(updatedState.avatar);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] updated props[avatar]...`, { old: avatar, new: updatedState.avatar } );
            }
            if(location !== updatedState.location){
                setLocation(updatedState.location);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] updated props[location]...`, { old: location, new: updatedState.location } );
            }
            
            storeImage(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { updated: { ...updatedState } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { props, stored:{ index, file, hash, avatar, location } } );
        }
    }, [ props ] );

     */

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { old:{ ...storedImage } } );

        if(props){
            setImage( props );
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old:{ ...storedImage }, new:{ ...props } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { old:{ ...storedImage } } );
        }
    }, [ props ] );

    return [ storedImage, setImage, getAllUserImages];
}