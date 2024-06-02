import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, Image, Text } from "native-base";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../styles/theme";
const { width: screenWidth } = Dimensions.get('window');

export default function ScheduleComponent({ item }:any) {
  const navigation: any = useNavigation()

  function goTicket(ticket:any):void {
    navigation.navigate('Ticket', {
      ticket: ticket,
    });
  }

  function getDate(date:any):string {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('ddd, DD MMM [•] H[h]mm')
  }

  return (
    <TouchableWithoutFeedback onPress={() => goTicket(item)}>
      <Box style={styles.container}>
        <Box style={styles.imageContainer}>
          {
            item.image ?
              <Image
                source={{uri: item.image}}
                alt={item.title}
                style={styles.image}
              />
            :
            <Box style={styles.whithOutImage}>
              <Text style={styles.whithOutImageText}>
                Eventos
              </Text>
            </Box>
          }
        </Box>

        <Box style={styles.description}>
          <Box style={styles.data}>
            <Text style={styles.date}>{getDate(item.startDate)}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </Box>

          {item.registration ? 
            <Box style={styles.registrationArea}>
              <Box style={styles.registration}>
                <Text style={styles.registrationText}>Incrições abertas</Text>
              </Box>
            </Box> 
            : null
          }
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    width: screenWidth * .35,
    height: screenWidth * .20,
    marginRight: 10,
  },
  image: {
    width: screenWidth * .35,
    height: screenWidth * .20,
    borderRadius: 5,
    backgroundColor: THEME.colors.primary
  },
  whithOutImage: {
    backgroundColor: THEME.colors.primary,
    width: screenWidth * .35,
    height: screenWidth * .20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whithOutImageText: {
    color: THEME.colors.backgroud,
    fontSize: THEME.fontSizes.md + 2,
    lineHeight: THEME.fontSizes.md + 2,
    fontFamily: 'InterTight_800ExtraBold',
    fontWeight: '800',
  },
  description: {
    width: (screenWidth * .65) - THEME.sizes.paddingPage * 3,
    height: screenWidth * .20,
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  date: {
    color:  THEME.colors.primary,
    fontSize: THEME.fontSizes.sm - 3,
    lineHeight: THEME.fontSizes.sm - 3,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  data: {
    width: screenWidth * .65 - THEME.sizes.paddingPage * 3,
    height: ((screenWidth * .20) - 30),
  },
  registrationArea: {
    width: screenWidth * .65,
  },
  registration: {
    width: screenWidth * .30,
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
    padding: 5,
    borderRadius: 10,
  },
  registrationText: {
    fontSize: THEME.fontSizes.sm - 2,
    lineHeight: THEME.fontSizes.sm - 2,
    color: THEME.colors.backgroud,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  }
})