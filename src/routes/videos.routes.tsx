import { createStackNavigator } from "@react-navigation/stack";

import { Videos } from "../screens/Videos/pages/Videos";
import { WatchVideo } from "../screens/Videos/pages/WatchVideo";

import { THEME } from "../styles/theme";

const { Navigator, Screen } = createStackNavigator();

export default function VideosRoutes() {
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
				fontFamily: 'Roboto_500Medium',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
			},
		}}>
			<Screen
				name="Palavras"
				component={Videos}
			/>

			<Screen
				name="WatchVideo"
				component={WatchVideo}
				options={({ route }:any) => ({ title: route.params.video.title })}
			/> 
		</Navigator>
	);
};
