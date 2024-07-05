import { NavLink } from "react-router-dom";
import { TSidebar, TUserPaths } from "../types";

export const sidebarItemsGenerator = (items: TUserPaths[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebar[], route) => {
    if (route.path && route.element) {
      acc.push({
        key: route.name,
        label: <NavLink to={`/${role}/${route.path}`}> {route.name} </NavLink>,
      });
    }
    if (route.children) {
      acc.push({
        key: route.name,
        label: route.name,
        children: route.children.map((children) => {
          if (children.name) {
            return {
              key: children.name,
              label: (
                <NavLink to={`/${role}/${children.path}`}>
                  {" "}
                  {children.name}{" "}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
