import { createStackNavigator } from "@react-navigation/stack";
import { THEME } from "../styles/theme";
import { More } from "../screens/More/pages/More";
import { Dimensions } from "react-native";
import { ScheduleList } from "../screens/Schedule/pages/ScheduleList";
import { returnBtn } from "../components/ReturnBtn";
import { Ticket } from "../screens/Schedule/pages/Ticket";
import { Schedule } from "../screens/Schedule/pages/Schedule";
import { Icon, IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');

export default function MoreRoutes() {
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
			name="Mais"
			component={More}
		/>

			<Screen
				name="Schedule"
				component={Schedule}
				options={{
					headerTitle: 'Eventos',
					headerLeft: returnBtn,
					headerRight: () =>
					<IconButton
						onPress={() => navigation.navigate('ScheduleList')}
						icon={ <Icon as={MaterialCommunityIcons} name="calendar-blank"/> }
						borderRadius={'full'}
						_icon={{ color: '#FFF', size: 6, opacity: .7 }}
						_pressed={{
							backgroundColor: THEME.colors.primary,
							_icon: { color: THEME.colors.backgroud, opacity: 1 }
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
}