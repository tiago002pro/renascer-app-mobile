import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, Image, Text } from "native-base";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../styles/theme";
const { width: screenWidth } = Dimensions.get('window');

export default function ScheduleComponent({ item }:any) {
  const navigation: any = useNavigation()
  const [date, setDate] = useState('');

  function goTicket(ticket:any):void {
    navigation.navigate('Ticket', {
      ticket: ticket,
    });
  }

  useEffect(() => {
    function changeFormatDate() {
      const date: string = moment(item.startDate).format('ddd, DD MMM [•] h[h]mm');
      setDate(date);
    }
    changeFormatDate()
  }, [])

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
            <Image
              source={require('../../../../assets/images/eventos.png')}
              alt={item.title}
              style={styles.image}
            />
          }
        </Box>

        <Box style={styles.description}>
          <Box style={styles.data}>
            <Text style={styles.date}>{date}</Text>
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
    backgroundColor: THEME.colors.gray[500]
  },
  description: {
    width: (screenWidth * .65) - THEME.sizes.paddingPage * 3,
    height: screenWidth * .20,
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  date: {
    color:  THEME.colors.yellow[400],
    fontSize: THEME.fontSizes.lg / 2,
    lineHeight: THEME.fontSizes.lg / 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    fontWeight: 'bold',
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
    backgroundColor: THEME.colors.yellow[400],
    padding: 5,
    borderRadius: 10,
  },
  registrationText: {
    fontSize: THEME.fontSizes.sm - 2,
    lineHeight: THEME.fontSizes.sm - 2,
    color: THEME.colors.backgroud,
  }
})