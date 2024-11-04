import type {
    Dispatch, ReactElement, SetStateAction
}                         from 'react';
import { AppActionProps } from '../../app';

/**
 *
 * @type SidePanelProps
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 05:45 pm
 */
export type SidePanelProps = {
    //setIsOpen?: Dispatch<SetStateAction<boolean>>;
    appAction?: AppActionProps;
    setAppAction?: Dispatch<SetStateAction<AppActionProps>>;
    //isOpen?: boolean;
    children?:ReactElement
}

/**
 *
 * @type SidePanelState
 * @author Isaac Ewing
 * @version 1.0.0 10/03/24 02:51 pm
 */
export type SidePanelState = {
    isOpen: boolean;
}
