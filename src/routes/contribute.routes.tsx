import { createStackNavigator } from "@react-navigation/stack";
import { THEME } from "../styles/theme";
import { Contribute } from "../screens/Contribute/pages/Contribute";

const { Navigator, Screen } = createStackNavigator();

export default function ContributeRoutes() {
	return (
		<Navigator screenOptions={{
			headerShown: true,
			headerStyle: {
				backgroundColor: THEME.colors.header,
			},
			headerTitleAlign: 'center',
			headerTintColor: THEME.colors.white,
			headerShadowVisible: false,
			headerBackTitleVisible: false,
			headerTitleStyle: {
				color: THEME.colors.white,
				fontFamily: 'Roboto_500Medium',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
			},
		}}>
			<Screen
				name="Contribua"
				component={Contribute}
			/>
		</Navigator>
	);
}