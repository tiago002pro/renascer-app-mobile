import { createStackNavigator } from "@react-navigation/stack";
import { THEME } from "../../../../styles/theme";
import { More } from "../More";
import { Dimensions } from "react-native";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');

export default function MoreRoutes() {
	return (
		<Navigator screenOptions={{
			headerShown: true,
			headerStyle: {
				backgroundColor: THEME.colors.header,
			},
			headerTitleAlign: 'center',
			headerShadowVisible: false,
			headerBackTitleVisible: false,
			headerTitleStyle: {
				color: THEME.colors.font,
				fontFamily: 'InterTight_600SemiBold',
				fontWeight: '600',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
				width: width * 0.55,
				textAlign: 'center',
			},
		}}>
		<Screen
			name="More"
			component={More}
			options={{
				headerTitle: 'Mais',
			}}
		/>
	</Navigator>
	);
}