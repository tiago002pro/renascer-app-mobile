import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, Image, Text, VStack, View } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

import { THEME } from "../../../styles/theme";

const { width, height } = Dimensions.get('screen');
const withDescription = (width - THEME.sizes.paddingPage * 2);

export function Ticket({ route }:any) {
  const { ticket } = route.params;
  
  const [dateFirst, setDateFirst] = useState('');
  const [dateSecound, setDateSecound] = useState('');

  useEffect(() => {
    function changeFormatDateFirst() {
      const startDate: string = moment(ticket.startDate).format('DD [de] MMMM, [das] h[h]mm [às]');
      const endTime: string = moment(ticket.endDate).format(' h[h]mm.');
      setDateFirst(startDate + endTime);
    }

    function changeFormatDateSecound() {
      const date: string = moment(ticket.startDate).format('[Dia] DD.MM, dddd, [às] h[h]mm.');
      setDateSecound(date);
    }

    changeFormatDateFirst()
    changeFormatDateSecound()
  }, [])

  return(
    <VStack style={styles.container}>
      <View style={styles.data}>
        {
          ticket.image ?
            <Image 
              style={styles.image}
              source={{uri: ticket.image}}
              alt={ticket.title}
            />
          :
            null
        }
        <View style={styles.description}>
          <Text style={styles.title}>
            {ticket.title}
          </Text>

          <Box style={styles.information}>
            <Box style={styles.icon}>
              <MaterialCommunityIcons name="calendar-blank" color={THEME.colors.primary} size={25}/>
            </Box>
            <Box style={styles.info}>
              <Text style={styles.text}>
                {dateFirst}
              </Text>

              {/* <Button
                onPress={() => {}}
                rightIcon={<Icon as={MaterialCommunityIcons} name="arrow-right" size="sm" color={'yellow.400'}/>}
                p={0} justifyContent={'flex-start'} bg={'transparent'} mt={2}
                _text={{
                  fontSize: THEME.fontSizes.sm,
                  lineHeight: THEME.fontSizes.sm,
                  color: 'yellow.400'
                }}
                _pressed={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
              >
                Salvar na agenda
              </Button> */}

            </Box>
          </Box>

          <Box style={styles.information}>
            <Box style={styles.icon}>
              <MaterialIcons name="location-on" color={THEME.colors.primary} size={25}/>
            </Box>
            <Box style={styles.info}>
              <Text style={styles.text}>
                {ticket.address}
              </Text>

              {/* <Button
                onPress={() => {}}
                rightIcon={<Icon as={MaterialCommunityIcons} name="arrow-right" size="sm" color={'yellow.400'}/>}
                p={0} justifyContent={'flex-start'} bg={'transparent'} mt={2}
                _text={{
                  fontSize: THEME.fontSizes.sm,
                  lineHeight: THEME.fontSizes.sm,
                  color: 'yellow.400'
                }}
                _pressed={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
              >
                Veja a rota no mapa
              </Button> */}

            </Box>
          </Box>

          <Box style={styles.boxLine}>
            <Box style={styles.line}/>
          </Box>

          <Box style={styles.information}>
            <Box style={styles.icon}>
              <MaterialCommunityIcons name="text-box" color={THEME.colors.primary} size={25}/>
            </Box>
            <Box style={styles.info}>
              <Text style={styles.subtitle}>Sobre</Text>
              <Text style={styles.text}>
                {ticket.description}
              </Text>
              <Text style={styles.date}>
                {dateSecound}
              </Text>
            </Box>
          </Box>

        </View>
      </View>
      {/* {ticket.registration ? 
        <VStack style={styles.footer}>
          <ButtonComponent
            children={"Ingressos"}
            bg={'yellow.400'}
            color={THEME.colors.backgroud}
            bntFunction={() => {}}
            textTransform={'capitalize'}
            w={'100%'}
          />
        </VStack>
        : null
      } */}
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
  },
  data: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: width,
    height: (height * .27),
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    width: withDescription,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title,
    color: THEME.colors.white,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: THEME.fontSizes.subTitle,
    lineHeight: THEME.fontSizes.subTitle,
    color: THEME.colors.white,
    marginBottom: 10,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  text: {
    fontSize: THEME.fontSizes.text,
    lineHeight: THEME.fontSizes.text + 2,
    color: THEME.colors.white,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  date: {
    fontSize: THEME.fontSizes.text,
    lineHeight: THEME.fontSizes.text + 2,
    color: THEME.colors.white,
    marginTop: 5,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    width: withDescription * .09,
  },
  info: {
    width: (withDescription - (withDescription * .13)),
    justifyContent: 'center' 
  },
  boxLine: {
    width: withDescription,
    display: 'flex',
    marginBottom: 20,
  },
  line: {
    width: (withDescription - (withDescription * .13)),
    height: 1,
    left: withDescription * .09,
    backgroundColor: THEME.colors.primary
  },
  footer: {
    width: withDescription,
    marginBottom: THEME.sizes.paddingPage,
  }
})