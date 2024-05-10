import { createStackNavigator } from "@react-navigation/stack";
import { THEME } from "../styles/theme";
import { returnBtn } from "../components/ReturnBtn";
import { More } from "../screens/More/pages/More";

const { Navigator, Screen } = createStackNavigator();

export default function MoreRoutes() {
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
				fontFamily: 'InterTight_600SemiBold',
				fontWeight: 600,
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
				opacity: .7,
			},
		}}>
			<Screen
				name="Mais"
				component={More}
			/>
		</Navigator>
    );
}