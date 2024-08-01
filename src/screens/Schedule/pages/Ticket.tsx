import React from "react";
import { Dimensions, Linking, StyleSheet } from "react-native";
import { Box, Image, Text, VStack, View } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { THEME } from "../../../styles/theme";
import ButtonComponent from "../../../components/ButtonComponent";

const { width, height } = Dimensions.get('screen');
const withDescription = (width - THEME.sizes.paddingPage * 2);

export function Ticket({ route }:any) {
  const { ticket } = route.params;

  function openLink(link:string) {
    Linking.openURL(link)
  }
  
  function getDate(date:any, format:string):string {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').format(format)
  }

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
                {getDate(ticket.startDate, 'DD [de] MMMM H[h]mm')}
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
            </Box>
          </Box>

        </View>
      </View>
      {ticket.registration ? 
        <VStack style={styles.footer}>
          <ButtonComponent
            label={"Fazer iscrição"}
            bg={THEME.colors.primary}
            color={THEME.colors.backgroud}
            bntFunction={() => openLink(ticket.link)}
          />
        </VStack>
        : null
      }
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
    color: THEME.colors.font,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: THEME.fontSizes.subTitle,
    color: THEME.colors.font,
    marginBottom: 10,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
  },
  text: {
    fontSize: THEME.fontSizes.text,
    color: THEME.colors.font,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
  },
  date: {
    fontSize: THEME.fontSizes.text,
    color: THEME.colors.font,
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