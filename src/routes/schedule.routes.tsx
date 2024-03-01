import { createStackNavigator } from "@react-navigation/stack";

import { Schedule } from "../screens/Schedule/pages/Schedule";
import { Ticket } from "../screens/Schedule/pages/Ticket";

import { THEME } from "../styles/theme";
import { returnBtn } from "../components/ReturnBtn";

const { Navigator, Screen } = createStackNavigator();

export default function ScheduleRoutes() {
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
				fontFamily: 'Roboto_700Bold',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
			},
			headerLeft: returnBtn
		}}>
			<Screen
				name="Eventos"
				component={Schedule}
			/>

			<Screen
				name="Ticket"
				component={Ticket}
				options={({ route }:any) => ({ title: route.params.ticket.title })}
			/> 
		</Navigator>
	);
};
