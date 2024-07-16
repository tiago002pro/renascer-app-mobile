import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME } from "../styles/theme";
import VideosRoutes from "./videos.routes";
import ScheduleRoutes from "./schedule.routes";
import DashboardRoutes from "./dashboard.routes";
import MoreRoutes from "./more.routes";
import ContributeRoutes from "./contribute.routes";
import ExpoNotification from "../screens/Notification";

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
      tabBarInactiveTintColor: THEME.colors.font, 
      tabBarActiveTintColor: THEME.colors.primary,
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 5,
        fontFamily: 'InterTight_500Medium',
        fontWeight: '500',
      },
      headerTitleStyle: {
				color: THEME.colors.font,
				fontFamily: 'InterTight_700Bold',
        fontWeight: '700',
				textTransform: 'capitalize',
				fontSize: THEME.fontSizes.md,
      },
    }}>
      <Screen
        name="DashboardRoutes"
        component={DashboardRoutes}
        options={{
          tabBarIcon: ({ color, size, focused  }) => <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />,
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />

      <Screen
        name="VideosRoutes"
        component={VideosRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "videocam" : "videocam-outline"} color={color} size={size} />,
          tabBarLabel: "Palavras",
          headerShown: false,
        }}
      />

      <Screen
        name="ScheduleRoutes"
        component={ScheduleRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "calendar-clear" : "calendar-clear-outline"} color={color} size={size} />,
          tabBarLabel: "Eventos",
          headerShown: false,
        }}
      />

      <Screen
        name="ContributeRoutes"
        component={ContributeRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => <MaterialCommunityIcons name={focused ? "heart-multiple" :  "heart-multiple-outline"} color={color} size={size} />,
          tabBarLabel: "Contribua",
          headerShown: false,
        }}
      />

      <Screen
        name="MoreRoutes"
        component={MoreRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => <MaterialIcons name={focused ? "more" :  "more-horiz"} color={color} size={size} />,
          tabBarLabel: "Mais",
          headerShown: false,
        }}
      />

      {/* <Screen
        name="ExpoNotification"
        component={ExpoNotification}
        options={{
          tabBarIcon: ({ color, size, focused }) => <MaterialIcons name={focused ? "notifications-active" :  "notifications-none"} color={color} size={size} />,
          tabBarLabel: "Mais",
          headerShown: false,
        }}
      /> */}
    </Navigator>
  );
}