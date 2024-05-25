import { Dimensions } from "react-native";
import { Icon, IconButton } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Profile } from "../screens/Profile/pages/Profile";
import { Settings } from "../screens/Profile/pages/Settings";
import { EditProfile } from "../screens/Profile/pages/EditProfile";
import { DeleteProdile } from "../screens/Profile/pages/DeleteProfile";
import { Edit } from "../screens/Profile/pages/Edit";
import { returnBtn } from "../components/ReturnBtn";
import { CloseBtn } from "../components/CloseBtn";
import { THEME } from "../styles/theme";

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
			headerTintColor: THEME.colors.white,
			headerTitleAlign: 'center',
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
				name="Profile"
				component={Profile}
				options={{
					headerTitle: 'Meu Perfil',
					headerRight: () => 
						<IconButton
							onPress={() => navigation.navigate('Settings')}
							icon={ <Icon as={Ionicons} name="settings-sharp"/> }
							borderRadius={'full'}
							_icon={{ color: '#FFF', size: 6, opacity: .7 }}
							_pressed={{
								backgroundColor: THEME.colors.primary,
								_icon: { color: THEME.colors.backgroud, opacity: 1 }
							}}
							style={{marginRight: THEME.sizes.paddingPage * 2}}
						/>
					,
					headerLeft: returnBtn
				}}
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
		</Navigator>
	);
};
