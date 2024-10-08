import { Dimensions } from "react-native";
import { Box, Icon, IconButton } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Profile } from "../screens/Profile/pages/Profile";
import { Settings } from "../screens/Profile/pages/Settings";
import { EditProfile } from "../screens/Profile/pages/EditProfile";
import { DeleteProdile } from "../screens/Profile/pages/DeleteProfile";
import { Edit } from "../screens/Profile/pages/Edit";
import { CloseBtn } from "../components/CloseBtn";
import { THEME } from "../styles/theme";
import { Notifications } from "../screens/Profile/pages/Notifications";
import { returnBtn } from "../components/ReturnBtn";
import { ChangePassword } from "../screens/Profile/pages/ChangePassword";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');

export default function ProfileRoutes() {
	const navigation:any = useNavigation();

	return (
		<Navigator screenOptions={{
			headerShown: true,
			headerStyle: {
				backgroundColor: THEME.colors.header,
			},
			headerTintColor: THEME.colors.font,
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
				name="Profile"
				component={Profile}
				options={({ route }:any) => ({
					headerTitle: 'Meu Perfil',
					headerRight: () =>
						<Box flexDirection={'row'}>
							<Box >
								{
									route?.params?.hasNotification ?
										<MaterialIcons name="circle" color={THEME.colors.primary} size={15}
											style={{ position: 'absolute', right: 7, top: 5, zIndex: 1 }}
										/>
									:
										null
								}
								<IconButton
									onPress={() => navigation.navigate('Notifications')}
									icon={ <Icon as={Ionicons} name="notifications"/> }
									borderRadius={'full'}
									_icon={{ color: THEME.colors.font, size: 6 }}
									_pressed={{
										backgroundColor: THEME.colors.primary,
										_icon: { color: THEME.colors.backgroud }
									}}
								/>
							</Box>

							<Box>
								<IconButton
									onPress={() => navigation.navigate('Settings')}
									icon={ <Icon as={Ionicons} name="settings-sharp"/> }
									borderRadius={'full'}
									_icon={{ color: THEME.colors.font, size: 6 }}
									_pressed={{
										backgroundColor: THEME.colors.primary,
										_icon: { color: THEME.colors.backgroud }
									}}
									style={{marginRight: THEME.sizes.paddingPage * 2}}
								/>
							</Box>
						</Box>
					,
					headerLeft: returnBtn
				})}
			/>

			<Screen
				name="Settings"
				component={Settings}
				options={{
					headerTitle: 'Configurações',
					headerLeft: returnBtn
				}}
			/>

			<Screen
				name="EditProfile"
				component={EditProfile}
				options={{
					headerTitle: 'Editar perfil',
					headerLeft: returnBtn,
					headerRight: CloseBtn,
				}}
			/>

			<Screen
				name="Edit"
				component={Edit}
				options={{
					headerTitle: 'Editar perfil',
					headerLeft: returnBtn,
					headerRight: CloseBtn,
				}}
			/>

			<Screen
				name="DeleteProdile"
				component={DeleteProdile}
				options={{
					headerTitle: 'Confirmar exclusão',
					headerLeft: returnBtn,
				}}
			/>

			<Screen
				name="Notifications"
				component={Notifications}
				options={{
					headerTitle: 'Notificações',
					headerLeft: returnBtn,
				}}
			/>

			<Screen
				name="ChangePassword"
				component={ChangePassword}
				options={{
					headerTitle: 'Alterar senha',
					headerLeft: returnBtn,
				}}
			/>
		</Navigator>
	);
};
