import { Box, Icon, IconButton } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { Profile } from "../screens/Profile/pages/Profile";
import { Settings } from "../screens/Profile/pages/Settings";
import { EditProfile } from "../screens/Profile/pages/EditProfile";
import { DeleteProdile } from "../screens/Profile/pages/DeleteProfile";

import { returnBtn } from "../components/ReturnBtn";
import { CloseBtn } from "../components/CloseBtn";

import { THEME } from "../styles/theme";

const { Navigator, Screen } = createStackNavigator();

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
		}}>

			<Screen
				name="Profile"
				component={Profile}
				options={{
					headerTitle: 'Meu Perfil',
					headerRight: () => 
					<Box>
						<IconButton
							m={0} p={0} right={0}
							onPress={() => navigation.navigate('Settings')}
							icon={
								<Icon as={Ionicons} name="settings-sharp" />
							}
							borderRadius={'full'}
							_icon={{
								color: '#FFF',
								size: 6
							}}
							_pressed={{
								backgroundColor: 'transparent'
							}}
							style={{marginEnd: THEME.sizes.paddingPage}}
						/>
					</Box>,
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