import { Box, FlatList, Text, View } from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { THEME } from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import NotificationService from "../service/NotificationService";
import { Notification } from "../../../interfaces/Notification.interface";

export function Notifications() {
  const [notificationsList, setnotificationsList] = useState() as any[];

  useEffect(() => {
    async function getAllNotifications() {
      const result:any = await NotificationService.getAllNotifications()
      setnotificationsList(result)
    }
    
    getAllNotifications()
  }, [])

  async function readNotification(notification:any) {
    await NotificationService.readNotification(notification.id).then((response) => {
      const newList = notificationsList.map((item:any) => {
        if (item.id === notification.id) {
          return { ...item, read: response.read };
        }
        return item;
      })
      setnotificationsList(newList)
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsList}
        keyExtractor={(item:Notification) => item.id.toString()}
        renderItem={({item}) => {
          return <TouchableWithoutFeedback onPress={() => readNotification(item)}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <Box flexDirection={'row'} justifyContent={'space-between'}>
                <Text style={styles.date}>{item.date.toString()}</Text>
                {
                  item.read
                  ? <Ionicons name="checkmark-done-sharp" color={THEME.colors.primary} size={30}/>
                  : <Ionicons name="checkmark-sharp" color={THEME.colors.white} size={30} style={{opacity: .7}} />
                }
              </Box>
            </View>
          </TouchableWithoutFeedback>
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: THEME.sizes.paddingPage,
    backgroundColor: THEME.colors.backgroud,
  },
  item: {
    padding: THEME.sizes.paddingPage,
    borderBottomWidth: 1,
    borderColor: THEME.colors.white,
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  description: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 20,
  },
  date: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 20,
  },
})