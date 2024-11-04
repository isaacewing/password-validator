import type { LocalStorageOptions }   from 'use-local-storage-state';
import type { SidebarState }          from '../../../../type';
import { useEffect }                  from 'react';
import { default as useStorageState } from 'use-local-storage-state';
import { IdentityConfig }             from '../../../../config';
import {
    SidebarButtonShapeEnum, SidebarShapeToolEnum
}                                     from '../../../../enum';

export function useSidebar( props:SidebarState | null):[ props:SidebarState, ( props: Partial<SidebarState> ) => void ]{
    const CONFIG_COMPONENT_ID:string = IdentityConfig.hookComNavSidebarId;
    const CONFIG_CONSOLE_CODE:string = IdentityConfig.hookComNavSidebarCode;
    const defaultState:LocalStorageOptions<SidebarState>={
        defaultValue: {
            shape    : SidebarButtonShapeEnum.Select,
            isDefault: true,
            isInit   : true,
            panels   : [],
        },
    }
    const [storedSidebar,storeSidebar]              = useStorageState<SidebarState>(CONFIG_COMPONENT_ID, defaultState);
    /*
    const [shape, setShape]                         = useState<SidebarButtonShapeEnum>( storedSidebar?.shape ?? null );
    const [isDefault, setIsDefault]                 = useState<boolean>( storedSidebar?.isDefault ?? null );
    const [isInit, setIsInit]                       = useState<boolean>( storedSidebar?.isInit ?? null );
    const [panels, setPanels]                       = useState<SidebarShapeToolEnum[]>( storedSidebar?.panels ?? null );

     */
    const setSidebar = (props:Partial<SidebarState>):void => {
        console.log(`${CONFIG_CONSOLE_CODE} setSidebar started...`, {old:{ ...storedSidebar}, new: {...props}});

        const updatedState:SidebarState={
            ...storedSidebar,
            isDefault:false,
            isInit: false,
            panels: getPanels(props?.shape),
            ...props,
        }

        if(JSON.stringify(storedSidebar) !== JSON.stringify(updatedState)){
            storeSidebar(updatedState);
            console.log(`${CONFIG_CONSOLE_CODE} setSidebar done...`, {old:{ ...storedSidebar}, new: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} setSidebar skipped, already current...`, {old:{ ...storedSidebar}, new: {...props}});
        }
    }
    const getPanels = (shape:SidebarButtonShapeEnum):SidebarShapeToolEnum[] => {
        switch(shape){
            case SidebarButtonShapeEnum.Select:
            case SidebarButtonShapeEnum.Save:
            case SidebarButtonShapeEnum.Load:
                return [];
            case SidebarButtonShapeEnum.Idea:
                return [
                    SidebarShapeToolEnum.Font,
                ];
            case SidebarButtonShapeEnum.Freehand:
            case SidebarButtonShapeEnum.Flag:
            case SidebarButtonShapeEnum.Triangle:
                return [
                    SidebarShapeToolEnum.Transform,
                    SidebarShapeToolEnum.Appearance,
                ];
            default:
                return [
                    SidebarShapeToolEnum.Transform,
                    SidebarShapeToolEnum.Appearance,
                    SidebarShapeToolEnum.Font,
                ];
        }
    }

    /*
    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedSidebar] starting...`, {...storedSidebar});

        if(storedSidebar){
            setShape( storedSidebar.shape );
            setIsDefault( storedSidebar.isDefault );
            setIsInit( storedSidebar.isInit );
            setPanels( getPanels(storedSidebar.shape) );

            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedSidebar] done...`, {...storedSidebar});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[storedSidebar] skipped, storedSidebar null...`, {storedSidebar});
        }
    }, [storedSidebar] );

     */

    /*
    useEffect(():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[shape] starting...`, {shape: storedSidebar.shape, panels: storedSidebar.panels});

        if(shape && shape !== storedSidebar?.shape){
            setShape(storedSidebar.shape);
            setPanels(getPanels(shape));
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[shape] done...`, {shape: storedSidebar.shape, panels: storedSidebar.panels});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[shape] skipped, storedSidebar null...`, {shape: storedSidebar.shape, panels: storedSidebar.panels});
        }
    }, [shape]);

     */
    /*
    useEffect(():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] starting...`, {props, stored:{shape, isDefault, isInit}});

        if(props){
            const updatedState:SidebarState = {
                shape,
                isDefault,
                isInit,
                panels: getPanels(props?.shape),
                ...props,
            };

            if(shape !== updatedState?.shape){
                setShape(updatedState.shape);
                setPanels(updatedState.panels)
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, {shape, updated:updatedState.shape});
            }
            if(isDefault !== updatedState.isDefault){
                setIsDefault(updatedState.isDefault);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, {isDefault, updated:updatedState.isDefault});
            }
            if(isInit !== updatedState.isInit){
                setIsInit(updatedState.isInit);
                console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, {isInit, updated:updatedState.isInit});
            }

            storeSidebar(updatedState)
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, {stored: {...updatedState}});
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, {props, stored:{shape, isDefault, isInit}});
        }
    }, [props]);

     */

    useEffect( ():void => {
        console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] started...`, { old:{ ...storedSidebar } } );

        if(props){
            setSidebar( props );
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] done... updated props`, { old:{ ...storedSidebar }, new:{ ...props } } );
        }else{
            console.log(`${CONFIG_CONSOLE_CODE} useEffect[props] skipped, props null...`, { old:{ ...storedSidebar } } );
        }
    }, [ props ] );

    return [ storedSidebar, setSidebar ];
}