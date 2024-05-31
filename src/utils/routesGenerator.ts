/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRoute, TUserPaths } from "../types";
export const routesGenerator = (items: TUserPaths[]) => {
     const routes = items.reduce((acc: TRoute[], route ) => {
        if (route.path && route.element) {
            acc.push({
                path: route.path,
                element: route.element
            })
        }

        if (route.children) {
            route.children.forEach(children => {
                acc.push({
                    path: children.path! ,
                    element: children.element
                })
            })
        }
        return acc
    }, [])
    return routes
}