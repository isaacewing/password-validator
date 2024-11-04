import type { LocalStorageOptions }   from 'use-local-storage-state';
import type { EditorModeState }       from '../../../../type';
import { MarkerBaseEditor }           from '@markerjs/markerjs3';
import { useEffect }                  from 'react';
import { default as useStorageState } from 'use-local-storage-state';
import { IdentityConfig }             from '../../../../config';
import {
    EditorModeEnum, EditorStateEnum,
    EditorStyleEnum
}                                     from '../../../../enum';

export function useEditorMode( props:EditorModeState | null):[ props:EditorModeState, ( props: Partial<EditorModeState> ) => void ]{
    const CONFIG_COMPONENT_ID:string                        = IdentityConfig.hookComAnnotationEditorModeId;
    const CONFIG_CONSOLE_CODE:string                        = IdentityConfig.hookComAnnotationEditorModeCode;
    const DEFAULT_MODE:EditorModeEnum                       = EditorModeEnum.Normal;
    const DEFAULT_STATE:EditorStateEnum                     = EditorStateEnum.New;
    const DEFAULT_STYLE:EditorStyleEnum                     = EditorStyleEnum.Draw;
    const DEFAULT_TYPE:string                               = null;
    const DEFAULT_MARKER: MarkerBaseEditor                  = null;
    const defaultState:LocalStorageOptions<EditorModeState> = {
        defaultValue: {
            mode: DEFAULT_MODE,
            state: DEFAULT_STATE,
            style: DEFAULT_STYLE,
            type: DEFAULT_TYPE,
            marker: DEFAULT_MARKER,
        },
    }
    const [ storedMode,storeMode ]                          = useStorageState<EditorModeState>( CONFIG_COMPONENT_ID, defaultState);
    const setMode         = (props:Partial<EditorModeState>):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setMode started...`, {old:{ ...storedMode}, new: {...props}});

        const updatedState:EditorModeState={
            ...defaultState.defaultValue,
            ...storedMode,
            ...props,
        }

        if(JSON.stringify(storedMode) !== JSON.stringify(updatedState)){
            storeMode(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} setMode done...`, {old:{ ...storedMode}, new: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setMode skipped, already current...`, {old:{ ...storedMode}, new: {...updatedState}});
        }
    }

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { old:{ ...storedMode } } );

        if(props){
            setMode( props );
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old:{ ...storedMode }, new:{ ...props } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { old:{ ...storedMode } } );
        }
    }, [ props ] );

    return [ storedMode, setMode ];
}