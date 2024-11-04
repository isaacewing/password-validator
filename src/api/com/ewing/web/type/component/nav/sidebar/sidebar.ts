import type { Dispatch, SetStateAction } from 'react';
import type { AppActionProps }           from '../../../app';
import {
    SidebarButtonShapeEnum, SidebarShapeToolEnum
}                                        from '../../../../enum';

/**
 *
 * @type SidebarProps
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 05:45 pm
 */
export type SidebarProps = {
    //setIsOpen: Dispatch<SetStateAction<boolean>>;
    //action: SidebarButtonActionEnum;
    appAction: AppActionProps;
    setAppAction: Dispatch<SetStateAction<AppActionProps>>;
    //shortcut?: string;
}

export type SidebarState = {
    shape: SidebarButtonShapeEnum;
    isDefault: boolean;
    isInit: boolean;
    panels: SidebarShapeToolEnum[];
}
