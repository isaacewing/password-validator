import type { LocalStorageOptions }          from 'use-local-storage-state';
import type { SidePanelState, SidebarState } from '../../../type';
import { useEffect, useState }               from 'react';
import { default as useStorageState }        from 'use-local-storage-state';
import { IdentityConfig }                    from '../../../config';
import { SidebarButtonShapeEnum }            from '../../../enum';


export function useSidePanel( props:SidePanelState | null):[ props:SidePanelState, ( props: Partial<SidePanelState> ) => void ]{
    const CONFIG_COMPONENT_ID:string                       = IdentityConfig.hookComPanelSidePanelId;
    const CONFIG_NAV_SIDEBAR_DESKTOP_ID: string            = IdentityConfig.hookComNavSidebarId;
    const CONFIG_CONSOLE_CODE:string                       = IdentityConfig.hookComPanelSidePanelCode;
    const DEFAULT_IS_OPEN:boolean                          = false;
    const defaultState:LocalStorageOptions<SidePanelState> = {
        defaultValue: {
            isOpen: DEFAULT_IS_OPEN,
        },
    }
    const [ storedPanel,storePanel ]                       = useStorageState<SidePanelState>( CONFIG_COMPONENT_ID, defaultState);
    const [ storedShape ]                                  = useStorageState<SidebarState>(CONFIG_NAV_SIDEBAR_DESKTOP_ID);
    const [ isOpen, setIsOpen ]                            = useState<boolean>( storedPanel?.isOpen ?? null );
    const [ shape, setShape ]                              = useState<SidebarButtonShapeEnum>( storedShape?.shape ?? null );
    const setSidePanel    = (props:Partial<SidePanelState>):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setSidePanel started...`, {old:{ ...storedPanel}, new: {...props}});

        const updatedState:SidePanelState={
            ...storedPanel,
            ...props,
        }
        
        if(JSON.stringify(storedPanel)!== JSON.stringify(updatedState)){
            storePanel(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} setSidePanel done...`, {old:{ ...storedPanel}, new: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setSidePanel skipped, already current...`, {old:{ ...storedPanel}, new: {...props}});
        }
    }

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] started...`, {storedShape: storedShape.shape, shape});

        if(storedShape?.shape){
            setShape(storedShape.shape);
            setIsOpen(storedShape.panels.length > 0);
            storePanel({...storedPanel,isOpen: storedShape.panels.length > 0});
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] updated isOpen...`, {panels:storedShape.panels.length, isOpen: storedShape.panels.length > 0, storedSidePanel: storedPanel, });
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] done...`, {storedShape: storedShape.shape, shape, panels:storedShape.panels.length});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedShape] skipped, storedShape null...`, {storedShape: storedShape.shape, shape});
        }
    }, [ storedShape ] );

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { props, stored:{ isOpen } } );

        if(props){
            const updatedState:SidePanelState = {
                isOpen,
                ...props,
            };

            if(isOpen !== updatedState.isOpen){
                setIsOpen(updatedState.isOpen);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old: isOpen, new: updatedState.isOpen } );
            }

            storePanel(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { updated: { ...updatedState } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { props, stored:{ isOpen } } );
        }
    }, [ props ] );

    return [ { isOpen }, setSidePanel ];
}