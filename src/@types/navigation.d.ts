import { DetailsParams } from "./routeParams";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Create: undefined;
      Details: DetailsParams;
    }
  }
}
