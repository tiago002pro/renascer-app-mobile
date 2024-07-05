import { Box, Button, Icon, IconButton, Image, Text, View } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/auth";
import { Dashboard } from "../screens/Dashboard";
import { WatchVideo } from "../screens/Videos/pages/WatchVideo";
import ProfileRoutes from "./profile.routes";
import { returnBtn } from "../components/ReturnBtn";
import { THEME } from "../styles/theme";
import { Dimensions } from "react-native";
import { useState } from "react";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');
let logo = require('./../../assets/images/logo.png')

export default function DashboardRoutes() {
	const navigation:any = useNavigation();
	const { signed } = useAuth();
	const [hasNotification, setHasNotification] = useState<boolean>(false);

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
			headerTitleAlign: 'center',
			headerTintColor: THEME.colors.white,
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
								source={logo}
								alt="logo"
								style={{ width: 30, height: 30, marginRight: 10 }}
							/>
							<Text
								color={THEME.colors.white}
								textTransform={'uppercase'}
								fontSize={12}
								fontFamily={'InterTight_500Medium'}
								fontWeight={'500'}
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
								borderColor={THEME.colors.primary}
								borderWidth={1}
								_pressed={{
									backgroundColor: THEME.colors.primary,
									_text: {
									color: THEME.colors.backgroud,
									fontWeight: 'bold'
									}
								}}
								_text={{
									fontFamily: 'InterTight_500Medium',
									fontWeight: '500',
									color: THEME.colors.primary,
									textTransform: 'uppercase',
									fontSize: 12,
									lineHeight: 12,
								}}
								style={{marginRight: THEME.sizes.paddingPage * 2}}
							>
								Login
							</Button>
						:
							<Box style={{ marginRight: THEME.sizes.paddingPage * 2 }}>
								{
									hasNotification ?
										<MaterialIcons name="circle" color={THEME.colors.primary} size={15}
											style={{ position: 'absolute', right: 7, top: 5, zIndex: 1 }}
										/>
									:
										null
								}
								<IconButton
									onPress={goProfile}
									icon={ <Icon as={Ionicons} name="person-circle"/> }
									borderRadius={'full'}
									_icon={{ color: THEME.colors.font, size: 6 }}
									_pressed={{
										backgroundColor: THEME.colors.primary,
										_icon: { color: THEME.colors.backgroud }
									}}
								/>
							</Box>
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
