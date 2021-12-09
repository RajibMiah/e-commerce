import { createContext, Dispatch } from "react";


// interface ContextProps {
//     state: SidebarProps;
//     dispatch: Dispatch<any>;
// }

export const ProfileContext = createContext<Partial<any>>({});
