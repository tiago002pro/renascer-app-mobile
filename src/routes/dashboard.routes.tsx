import { Button, Icon, IconButton, Image, Text, View } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../contexts/auth";

import { Dashboard } from "../screens/Dashboard";
import { WatchVideo } from "../screens/Videos/pages/WatchVideo";

import ProfileRoutes from "./profile.routes";

import { returnBtn } from "../components/ReturnBtn";

import { THEME } from "../styles/theme";

const { Navigator, Screen } = createStackNavigator();

export default function DashboardRoutes() {
	const navigation:any = useNavigation();
	const {signed} = useAuth();

	function goSignIn():void {
		navigation.navigate('SignIn');
	}
	
	function goProfile():void {
		navigation.navigate('ProfileRoutes', {screen: 'Profile'});
	}
	
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
				name="Dashboard"
				component={Dashboard}
				options={{
					headerTitle: (
						() =>
						<View
							justifyContent={'space-between'}
							alignItems={'center'}
							flexDirection={'row'}
						>
							<Image
								source={require("./../../assets/images/logo.png")}
								alt="logo"
								style={{ width: 25, height: 25, marginRight: 7 }}
							/>
							<Text
								color={'#FFF'}
								textTransform={'uppercase'}
								fontSize={12}
							>
								Igreja Renascer
							</Text>
						</View>
				  	),
					headerRight: (
						() =>
						(!signed ?
							<Button
								m={0}
								onPress={goSignIn}
								borderRadius={50}
								height={8}
								backgroundColor={'transparent'}
								borderColor={THEME.colors.yellow[400]}
								borderWidth={1}
								_pressed={{
									backgroundColor: THEME.colors.yellow[400],
									_text: {
									color: THEME.colors.backgroud,
									fontWeight: 'bold'
									}
								}}
								_text={{
									color: THEME.colors.yellow[400],
									textTransform: 'uppercase',
									fontSize: 12,
									lineHeight: 12,
								}}
								style={{marginRight: THEME.sizes.paddingPage * 2}}
							>
								Login
							</Button>
						:
							<IconButton
								onPress={goProfile}
								icon={
									<Icon as={Ionicons} name="person-circle"/>
								}
								borderRadius={'full'}
								_icon={{
									color: THEME.colors.white,
									size: 6,
								}}
								_pressed={{
									backgroundColor: THEME.colors.primary2,
								}}
								style={{marginRight: THEME.sizes.paddingPage * 2}}
							/>
						)
					)
				}}
			/>

			<Screen
				name="WatchVideo"
				component={WatchVideo}
				options={({ route }:any) => ({ title: route.params.video.title, headerLeft: returnBtn })}
			/>

			<Screen
				options={{ headerShown: false }}
				name="ProfileRoutes"
				component={ProfileRoutes}
			/>
		</Navigator>
	);
};
