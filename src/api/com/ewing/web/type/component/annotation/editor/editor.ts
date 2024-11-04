import type { AnnotationState }    from '@markerjs/markerjs3';
import type { ReactElement }       from 'react';
import type { MarkerAreaEventMap } from '../../../../interface';
import { MarkerBaseEditor }        from '@markerjs/markerjs3';
import {
    EditorHistoryEnum, EditorModeEnum,
EditorStateEnum, EditorStyleEnum
}                                  from '../../../../enum';

/**
 *
 * @type EditorProps
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 05:45 pm
 */
export type EditorProps = {
    //setIsOpen: Dispatch<SetStateAction<boolean>>;
    //isOpen?: boolean;
    //annotation?: AnnotationState;
    //onAnnotationChange?: ( annotation: AnnotationState ) => void;
    //appAction: AppActionProps;
    //setAppAction: Dispatch<SetStateAction<AppActionProps>>;
    children?:ReactElement;
}

export type EditorModeState = {
    mode: EditorModeEnum;
    state: EditorStateEnum;
    style: EditorStyleEnum;
    type: string;
    marker: MarkerBaseEditor;
}

export type EditorImageState = {
    index: number;
    file: string;
    hash: string;
    avatar: string;
    location: string;
}

export type EditorHistoryProps = {
    action: EditorHistoryEnum;
    data: any;
}

export type EditorHistoryState = Map<string, AnnotationState>;

/**
 *
 * @type EditorEventListener
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 09:24 am
 */
// @ts-ignore
export type EditorEventListener = <T extends keyof MarkerAreaEventMap>( ev: MarkerAreaEventMap[ T ] ) => void;
// @ts-ignore
export type EditorEventListener = <K extends keyof HTMLElementEventMap>( ev: HTMLElementEventMap[ K ] ) => void;