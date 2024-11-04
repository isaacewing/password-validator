/**
 *
 * @enum EditorEventEnum
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 01:53 pm
 */
export enum SidebarButtonShapeEnum {
    Select = 'select',
    EditShape = 'edit-shape',
    Idea = 'TextMarker',
    Alert = 'EllipseFrameMarker',
    Remove = 'FrameMarker',
    Comment = 'CalloutMarker',
    Security = 'security',
    Flag = 'ArrowMarker',
    Approve = 'approve',
    Reject = 'reject',
    Pause = 'pause',
    Love = 'love',
    Freehand = 'FreehandMarker',
    Other = 'other',
    Ignore = 'ignore',
    Save = 'save',
    Load = 'load',
    Triangle = 'TriangleMarker',
}

export enum SidebarButtonEventEnum {
    ResetToPointer = 'reset-to-pointer',
    SidebarClick = 'sidebar-click',
    Deselected = 'deselected',
    EditorSaved = 'editor-saved',
}

export enum SidebarShapeToolEnum {
    Transform = 'transform',
    Appearance = 'appearance',
    Font = 'font',
}
