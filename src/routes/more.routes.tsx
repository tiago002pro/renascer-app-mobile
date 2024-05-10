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
				fontFamily: 'Roboto_500Medium',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
			},
		}}>
			<Screen
				name="Mais"
				component={More}
			/>
		</Navigator>
    );
}