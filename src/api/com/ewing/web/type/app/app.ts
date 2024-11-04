import type {
    ComponentEnum, SidebarButtonShapeEnum,
    SidebarButtonEventEnum,
} from '../../enum';

/**
 *
 * @type AppActionProps
 * @author Isaac Ewing
 * @version 1.0.0 10/02/24 11:32 pm
 */
export type AppActionProps = {
    action: SidebarButtonShapeEnum;
    event: SidebarButtonEventEnum | null;
    caller: ComponentEnum;
    image?: string;
    component?: string;
}
