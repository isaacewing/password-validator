import type { Dispatch, SetStateAction } from 'react';
import {
    ShapeStrokeStyleEnum, SidebarButtonShapeEnum
}                                        from '../../../../enum';

export type ShapeStrokeProps = {
    strokeColor:string;
    strokeWidth:number;
    strokeStyle:ShapeStrokeStyleEnum;
    fillColor:string;
    fillOpacity:number;
};

export type ShapePanelProps = {
    title?: string;
    description?: string;
    //strokeColor:string;
    //strokeWidth:number;
    //strokeStyle:ShapeStrokeStyleEnum;
    setStrokeColor?: Dispatch<SetStateAction<string>>;
    setStrokeWidth?: Dispatch<SetStateAction<number>>;
    setStrokeStyle?: Dispatch<SetStateAction<ShapeStrokeStyleEnum>>;
} & Partial<ShapeStrokeProps>;

export type ShapePanelState = Map<keyof typeof SidebarButtonShapeEnum | SidebarButtonShapeEnum, ShapeStrokeProps>;