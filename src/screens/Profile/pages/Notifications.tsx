import { Box, FlatList, Text, View } from "native-base";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { THEME } from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import NotificationService from "../service/NotificationService";
import { Notification } from "../../../interfaces/Notification.interface";
import ButtonComponent from "../../../components/ButtonComponent";
import moment from "moment";

export function Notifications() {
  const [notificationsList, setnotificationsList] = useState() as any[];
  const [modalVisible, setModalVisible] = useState(false);
  const [itemModal, setItemModal] = useState({}) as any;

  async function getAllNotifications() {
    const result:any = await NotificationService.getAllNotifications()
    setnotificationsList(result)
  }

  useEffect(() => {
    getAllNotifications()
  }, [])

  function openModal(item:any) {
    setModalVisible(true)
    setItemModal(item)
  }

  async function readNotification() {
    if (!itemModal.read) {
      await NotificationService.readNotification(itemModal.id)
    }
    getAllNotifications()
    setModalVisible(!modalVisible)
  }

  function formatDate(date:any, format:string):string {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsList}
        keyExtractor={(item:Notification) => item.id.toString()}
        renderItem={({item}) => {
          return <TouchableWithoutFeedback onPress={() => openModal(item)}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>

              <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} alignContent={'center'}>
                <Text style={styles.date}>{formatDate(item.date, 'DD/MM/YYYY H:mm')}</Text>
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

      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.date, {marginBottom: 20}]}>Enviado às {formatDate(itemModal.date, 'H:mm [em] DD/MM/YYYY')}</Text>
              <Text style={styles.title}>{itemModal.title}</Text>
              <Text style={styles.description}>{itemModal.description}</Text>
              <ButtonComponent label="OK" bntFunction={readNotification}/>
            </View>
          </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
  },
  item: {
    padding: THEME.sizes.paddingPage,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: THEME.colors.gray[600],
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.lg,
    fontFamily: 'InterTight_700Bold',
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  description: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: 20,
  },
  date: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.sm,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginTop: '-50%',
  },
  modalView: {
    width: '85%',
    backgroundColor: THEME.colors.gray[800],
    borderRadius: 10,
    padding: THEME.sizes.paddingPage * 2,
  },
})