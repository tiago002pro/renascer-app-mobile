import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tab.routes";
import SignIn from "../screens/Auth/Pages/SignIn/SignIn";
import Register from "../screens/Auth/Pages/Register/Register";
import RecoverPassword from "../screens/Auth/Pages/RecoverPassword";
import { returnBtn } from "../components/ReturnBtn";
import { THEME } from "../styles/theme";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');

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
				fontFamily: 'InterTight_600SemiBold',
				fontWeight: '600',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
				opacity: .7,
        width: width * 0.55,
				textAlign: 'center',
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
				name="RecoverPassword"
				component={RecoverPassword}
				options={{
					headerTitle: 'Recuperar senha',
					headerLeft: returnBtn,
				}}
			/>
    </Navigator>
  )
}