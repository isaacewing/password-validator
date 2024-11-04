/**
 *
 * @enum EditorEventEnum
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 10:02 am
 */
export enum EditorEventEnum {
    AreaInit = 'areainit',
    AreaShow = 'areashow',
    AreaRestoreState = 'arearestorestate',
    AreaFocus = 'areafocus',
    AreaBlur = 'areablur',
    AreaStateChange = 'areastatechange',
    MarkerSelect = 'markerselect',
    MarkerDeselect = 'markerdeselect',
    MarkerCreating = 'markercreating',
    MarkerCreate = 'markercreate',
    MarkerBeforeDelete = 'markerbeforedelete',
    MarkerDelete = 'markerdelete',
    MarkerChange = 'markerchange',
}
export enum EditorModeEnum {
    Normal = 'normal',
    Edit = 'edit',
}

// type MarkerEditorState = 'new' | 'creating' | 'select' | 'move' | 'resize' | 'rotate' | 'edit';
// type MarkerCreationStyle = 'draw' | 'drop';
export enum EditorStateEnum {
    New = 'new',
    Creating = 'creating',
    Select = 'select',
    Move = 'move',
    Resize = 'resize',
    Rotate = 'rotate',
    Edit = 'edit',
}

export enum EditorStyleEnum {
    Draw = 'draw',
    Drop = 'drop',
}

export enum EditorHistoryEnum {
    Add = 'add',
}