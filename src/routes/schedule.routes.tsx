import { Dimensions } from "react-native";
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
const { width } = Dimensions.get('screen');

export default function ScheduleRoutes() {
	const navigation:any = useNavigation();

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
				name="Schedule"
				component={Schedule}
				options={{
					headerTitle: 'Eventos',
					headerRight: () =>
					<IconButton
						onPress={() => navigation.navigate('ScheduleRoutes', {screen: 'ScheduleList'})}
						icon={ <Icon as={MaterialCommunityIcons} name="calendar-blank"/> }
						borderRadius={'full'}
						_icon={{ color: THEME.colors.font, size: 6 }}
						_pressed={{
							backgroundColor: THEME.colors.primary,
							_icon: { color: THEME.colors.backgroud }
						}}
						style={{marginRight: THEME.sizes.paddingPage * 2}}
					/>,
				}}
			/>

			<Screen
				name="ScheduleList"
				component={ScheduleList}
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
