import { Icon, IconButton } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { WatchVideo } from "../screens/Videos/pages/WatchVideo";
import { THEME } from "../styles/theme";
import { returnBtn } from "../components/ReturnBtn";
import { FilterVideo } from "../screens/Videos/pages/FilterVideo";
import { Dimensions } from "react-native";
import VideoScreen from "../screens/Videos/pages/VideoScreen";

const { Navigator, Screen } = createStackNavigator();
const { width } = Dimensions.get('screen');

export default function VideosRoutes() {
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
				name="VideoScreen"
				component={VideoScreen}
				options={{
					headerTitle: 'Palavras',
					headerRight: () =>
						<IconButton
							onPress={() => navigation.navigate('FilterVideo')}
							icon={ <Icon as={MaterialIcons} name="search" /> }
							borderRadius={'full'}
							_icon={{ color: THEME.colors.font, size: 6 }}
							_pressed={{
								backgroundColor: THEME.colors.primary,
								_icon: { color: THEME.colors.backgroud }
							}}
							style={{marginRight: THEME.sizes.paddingPage * 2}}
						/>
					,
				}}
			/>

			<Screen
				name="WatchVideo"
				component={WatchVideo}
				options={({ route }:any) => ({ title: route.params.video.title, headerLeft: returnBtn })}
			/>

			<Screen
				name="FilterVideo"
				component={FilterVideo}
				options={{ title: 'Pesquisa', headerLeft: returnBtn}}
			/> 
		</Navigator>
	);
};
