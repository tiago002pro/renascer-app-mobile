import { createStackNavigator } from "@react-navigation/stack";

import TabRoutes from "./tab.routes";
import SignIn from "../screens/Auth/Pages/SignIn/SignIn";
import Register from "../screens/Auth/Pages/Register/Register";
import ProfileRoutes from "./profile.routes";

import { returnBtn } from "../components/ReturnBtn";

import { THEME } from "../styles/theme";

const { Navigator, Screen } = createStackNavigator();

export default function StackRoutes() {
  return (
    <Navigator screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: THEME.colors.header,
      },
			headerTitleAlign: 'center',
			headerTintColor: THEME.colors.white,
			headerBackTitleVisible: false,
      headerTitleStyle: {
				color: THEME.colors.white,
				fontFamily: 'Roboto_500Medium',
				fontSize: THEME.fontSizes.md,
			},
    }}>
      <Screen
        options={{ headerShown: false }}
				name="TabRoutes"
				component={TabRoutes}
			/>

      <Screen
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME.colors.backgroud,
          },
          headerLeft: returnBtn
        }}
				name="SignIn"
				component={SignIn}
			/>

      <Screen
        options={{
          title: "Cadastre-se",
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME.colors.backgroud,
          },
          headerLeft: returnBtn
        }}
				name="Register"
				component={Register}
			/>

      <Screen
        options={{ headerShown: false }}
				name="ProfileRoutes"
				component={ProfileRoutes}
			/>
    </Navigator>
  )
}