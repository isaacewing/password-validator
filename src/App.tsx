import type { ReactElement } from 'react';
import type { AppActionProps } from './api/com/ewing/web/type';
import { useEffect, useState } from 'react';
import { Validator } from './api/com/ewing/web/component';
import { IdentityConfig } from './api/com/ewing/web/config';

export function App(): ReactElement {
    const CONFIG_COMPONENT_ID: string = IdentityConfig.app;
    const CONFIG_CONSOLE_CODE: string = '[  A  ]';
    const [appAction] = useState<AppActionProps | null>(null);

    useEffect((): void => {
        console.log(`${CONFIG_CONSOLE_CODE} ${CONFIG_COMPONENT_ID} useEffect[] called...`, {
            appAction,
        });
    }, []);

    return (
        <>
            <Validator minLength={6} reqLower={true} reqUpper={true} reqNum={true} reqSpecial={true} />
        </>
    );
}
