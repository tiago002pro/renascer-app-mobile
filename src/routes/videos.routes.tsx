import { createStackNavigator } from "@react-navigation/stack";

import { Videos } from "../screens/Videos/pages/Videos";
import { WatchVideo } from "../screens/Videos/pages/WatchVideo";

import { THEME } from "../styles/theme";
import { returnBtn } from "../components/ReturnBtn";

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
				fontFamily: 'InterTight_600SemiBold',
				fontWeight: 600,
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
				opacity: .7,
			},
		}}>
			<Screen
				name="Palavras"
				component={Videos}
			/>

			<Screen
				name="WatchVideo"
				component={WatchVideo}
				options={({ route }:any) => ({ title: route.params.video.title, headerLeft: returnBtn })}
			/> 
		</Navigator>
	);
};
