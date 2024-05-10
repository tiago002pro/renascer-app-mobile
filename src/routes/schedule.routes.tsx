import { Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Schedule } from "../screens/Schedule/pages/Schedule";
import { Ticket } from "../screens/Schedule/pages/Ticket";

import { THEME } from "../styles/theme";
import { returnBtn } from "../components/ReturnBtn";
import { ScheduleList } from "../screens/Schedule/pages/ScheduleList";

const { Navigator, Screen } = createStackNavigator();

export default function ScheduleRoutes() {
	const navigation:any = useNavigation();

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
		}}>
			<Screen
				name="ScheduleList"
				component={ScheduleList}
				options={{
					headerTitle: 'Agenda',
					headerLeft: returnBtn,
					headerRight: () =>
					<IconButton
						onPress={() => navigation.navigate('Schedule')}
						icon={
							<Icon as={MaterialCommunityIcons} name="calendar-blank" />
						}
						borderRadius={'full'}
						_icon={{
							color: '#FFF',
							size: 6,
						}}
						_pressed={{
							backgroundColor: THEME.colors.primary,
							_icon: {
							  color: THEME.colors.backgroud
							}
						}}
						style={{marginRight: THEME.sizes.paddingPage * 2}}
					/>,
				}}
			/>

			<Screen
				name="Schedule"
				component={Schedule}
				options={{
					headerTitle: 'Eventos',
					headerLeft: returnBtn,
				}}
			/>

			<Screen
				name="Ticket"
				component={Ticket}
				options={({ route }:any) => ({ title: route.params.ticket.title, headerLeft: returnBtn })}
			/> 
		</Navigator>
	);
};
