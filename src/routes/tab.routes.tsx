import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Dashboard } from "../screens/Dashboard";
import { New } from "../screens/New";

import { THEME } from "../../styles/theme";

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
        height: THEME.sizes.heightHeader,
      },
      tabBarActiveTintColor: THEME.colors.white,
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 5,
      },
      headerTitleStyle: {
        color: THEME.colors.white
      }
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
        name="New"
        component={New}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="video-library" color={color} size={size} />,
          tabBarLabel: "Conteúdo",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}