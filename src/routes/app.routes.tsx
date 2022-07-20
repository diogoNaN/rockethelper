import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Create from "../screens/Create";
import Details from "../screens/Details";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Create" component={Create} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
}
