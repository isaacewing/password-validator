import { MarkerArea, MarkerBaseEditor } from '@markerjs/markerjs3';
import { EditorEventEnum }              from '../../../../enum';

export interface MarkerAreaEventData {
    markerArea: MarkerArea;
}

export interface MarkerEditorEventData extends MarkerAreaEventData {
    markerEditor: MarkerBaseEditor;
}

export interface MarkerAreaEventMap {
    [EditorEventEnum.AreaInit]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.AreaShow]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.AreaRestoreState]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.AreaFocus]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.AreaBlur]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.AreaStateChange]: CustomEvent<MarkerAreaEventData>;
    [EditorEventEnum.MarkerSelect]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerDeselect]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerCreating]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerCreate]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerBeforeDelete]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerDelete]: CustomEvent<MarkerEditorEventData>;
    [EditorEventEnum.MarkerChange]: CustomEvent<MarkerEditorEventData>;
}
