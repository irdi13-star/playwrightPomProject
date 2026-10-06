import routesUtils from "../utils/routes.utils.js";

export namespace Utils {
  type _Routes = keyof typeof routesUtils;
  export type Routes = (typeof routesUtils)[_Routes];
}
