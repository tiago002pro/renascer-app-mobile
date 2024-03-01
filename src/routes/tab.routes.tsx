import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";

import { THEME } from "../styles/theme";
import VideosRoutes from "./videos.routes";
import ScheduleRoutes from "./schedule.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: true,
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: THEME.colors.header,
      },
      tabBarStyle: {
        backgroundColor: THEME.colors.tabBar,
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: THEME.colors.white,
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 5,
        fontFamily: 'Roboto_400Regular'
      },
      headerTitleStyle: {
				color: THEME.colors.white,
				fontFamily: 'Roboto_700Bold',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
      },
    }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
          tabBarLabel: "Início",
          headerShown: false,
        }}
      />

      <Screen
        name="VideosRoutes"
        component={VideosRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="video-library" color={color} size={size} />,
          tabBarLabel: "Conteúdo",
          headerShown: false,
        }}
      />

      <Screen
        name="ScheduleRoutes"
        component={ScheduleRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="event" color={color} size={size} />,
          tabBarLabel: "Eventos",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}