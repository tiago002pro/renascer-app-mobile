import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

import { THEME } from "../styles/theme";

import VideosRoutes from "./videos.routes";
import ScheduleRoutes from "./schedule.routes";
import DashboardRoutes from "./dashboard.routes";
import MoreRoutes from "./more.routes";
import ContributeRoutes from "./contribute.routes";

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
      tabBarActiveTintColor: THEME.colors.primary,
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 5,
        fontFamily: 'InterTight_500Medium',
        fontWeight: 500,
      },
      headerTitleStyle: {
				color: THEME.colors.white,
				fontFamily: 'InterTight_700Bold',
        fontWeight: 700,
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
      },
    }}>
      <Screen
        name="DashboardRoutes"
        component={DashboardRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />

      <Screen
        name="VideosRoutes"
        component={VideosRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="video-library" color={color} size={size} />,
          tabBarLabel: "Palavras",
          headerShown: false,
        }}
      />

      <Screen
        name="ScheduleRoutes"
        component={ScheduleRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="event" color={color} size={size} />,
          tabBarLabel: "Agenda",
          headerShown: false,
        }}
      />

      <Screen
        name="ContributeRoutes"
        component={ContributeRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
          tabBarLabel: "Contribua",
          headerShown: false,
        }}
      />

      <Screen
        name="MoreRoutes"
        component={MoreRoutes}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="more-horizontal" color={color} size={size} />,
          tabBarLabel: "Mais",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}