import { Box, FlatList, Text, View } from "native-base";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { THEME } from "../../../styles/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import NotificationService from "../service/NotificationService";
import { Notification } from "../../../interfaces/Notification.interface";
import ButtonComponent from "../../../components/ButtonComponent";
import moment from "moment";
import { useAuth } from "../../../contexts/auth";
import { showMessage } from "react-native-flash-message";

export function Notifications() {
  const { user } = useAuth() as any;
  const [notificationsList, setnotificationsList] = useState<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemModal, setItemModal] = useState({}) as any;

  async function getAllNotifications() {
    const result:any = await NotificationService.getAllNotifications(user.id)
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
      await getAllNotifications()
    }
    setModalVisible(!modalVisible)
  }

  function readAllNotifications() {
    if (notificationsList.length) {
      NotificationService.readAllNotifications(user.id).then(async (response) => {
        setnotificationsList(response)
        showMessage({ message: "Todas as notificações foram marcadas como lidas", type: "success"})
      })
    }
  }

  function deleteAllNotifications() {
    if (notificationsList.length) {
      NotificationService.deleteAllNotifications(user.id).then(async () => {
        showMessage({ message: "Todas as notificações lidas foram apagadas.", type: "success"})
        await getAllNotifications()
      })
    }
  }

  function formatDate(date:any, format:string):string {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format(format)
  }

  return (
    <View style={styles.container}>
      <Box style={styles.btns}>
        <Box w={'50%'}>
          <ButtonComponent
            w={'98%'}
            color={THEME.colors.backgroud}
            label="Ler todos"
            bntFunction={readAllNotifications}
          />
        </Box>
        <Box w={'50%'}>
          <ButtonComponent
            w={'98%'}
            color={THEME.colors.backgroud}
            label="Apagar todos os lidos"
            bntFunction={deleteAllNotifications}
          />
        </Box>
      </Box>

      {notificationsList?.length ?
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
                    : <Ionicons name="checkmark-sharp" color={THEME.colors.font} size={30} style={{opacity: .7}} />
                  }
                </Box>
              </View>
            </TouchableWithoutFeedback>
          }}
        />
        :
        <View style={styles.without}>
          <Box mb={3}>
            <MaterialIcons name="notifications-off" color={THEME.colors.primary} size={50}/>
          </Box>
          <Box alignItems={'center'}>
            <Text style={[styles.withoutText, {marginBottom: 5}]}>Você não possuí</Text>
            <Text style={styles.withoutText}>notificações</Text>
          </Box>
        </View>
      }

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
              <ButtonComponent label="OK" color={THEME.colors.backgroud} bntFunction={readNotification}/>
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
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: THEME.sizes.paddingPage * 2,
    borderBottomWidth: 1,
    borderColor: THEME.colors.gray[600],
  },
  title: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title + 5,
    fontFamily: 'InterTight_700Bold',
    fontWeight: '700',
    marginBottom: THEME.sizes.paddingPage,
    textTransform: 'uppercase',
  },
  description: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.md,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    marginBottom: THEME.sizes.paddingPage,
  },
  date: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.sm,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  without: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withoutText: {
    fontSize: THEME.fontSizes.lg,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.font,
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