import type {
    Dispatch, MouseEventHandler, ReactElement,
    SetStateAction,
}                            from 'react';
import type {
    SidebarButtonShapeEnum,
    SidebarButtonEventEnum, ViewportEnum,
}                            from '../../../../../enum';
import type { TooltipProps } from './tooltip.ts';

/**
 *
 * @type SidebarButtonProps
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 11:02 am
 */
export type SidebarButtonProps = {
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    shape: SidebarButtonShapeEnum;
    viewport?: ViewportEnum;
    href?: string;
    active?: boolean;
    disabled?: boolean;
    icon: ReactElement;
} & TooltipProps;

/**
 *
 * @type SidebarButtonObserver
 * @author Isaac Ewing
 * @version 1.0.0 09/30/24 07:09 pm
 */
export type SidebarButtonObserver = {
    event?:SidebarButtonEventEnum;
    shape: SidebarButtonShapeEnum | null;
    viewport?: ViewportEnum;
    icon?: SVGSVGElement;
    panels: [];
};
