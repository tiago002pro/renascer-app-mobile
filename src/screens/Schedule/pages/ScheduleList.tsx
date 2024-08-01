import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, FlatList, Icon, Select, Text, VStack, View } from "native-base";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScheduleService from "../service/ScheduleService";
import { Schedule, ScheduleDTO } from "../../../interfaces/Schedule.interface";
import { THEME } from "../../../styles/theme";

const { width: screenWidth } = Dimensions.get('window');

export function ScheduleList() {
  const currentYear = moment(new Date()).format('YYYY');

  const months = [
    { key: `${currentYear}-01`, label: `Janeiro de `   + currentYear },
    { key: `${currentYear}-02`, label: `Fevereiro de ` + currentYear },
    { key: `${currentYear}-03`, label: `Março de `     + currentYear },
    { key: `${currentYear}-04`, label: `Abril de `     + currentYear },
    { key: `${currentYear}-05`, label: `Maio de `      + currentYear },
    { key: `${currentYear}-06`, label: `Junho de `     + currentYear },
    { key: `${currentYear}-07`, label: `Julho de `     + currentYear },
    { key: `${currentYear}-08`, label: `Agosto de `    + currentYear },
    { key: `${currentYear}-09`, label: `Setembro de `  + currentYear },
    { key: `${currentYear}-10`, label: `Outubro de `   + currentYear },
    { key: `${currentYear}-11`, label: `Novembro de `  + currentYear },
    { key: `${currentYear}-12`, label: `Dezembro de `  + currentYear },
  ]
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [schedules, setSchedules] = useState([]) as any[];

  useEffect(() => {
    async function getSchedule() {
      getByStartDate(date)
    }
    getSchedule()
  }, [])

  async function getByStartDate(startDate:string) {
    setDate(startDate)
    const result:any = await ScheduleService.getByStartDate(startDate)
    setSchedules(result)
  }

  function getDate(date:any, format:string):string {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').format(format)
  }

  function getMonth(m:string):string {
    switch(m) {
      case '1':
        return 'Janeiro/2024'
      case '2':
        return 'Fevereiro/2024'
      case '3':
        return 'Março/2024'
      case '4':
        return 'Abril/2024'
      case '5':
        return 'Maio/2024'
      case '6':
        return 'Junho/2024'
      case '7':
        return 'Julho/2024'
      case '8':
        return 'Agosto/2024'
      case '9':
        return 'Setembro/2024'
      case '10':
        return 'Outubro/2024'
      case '11':
        return 'Novembro/2024'
      case '12':
        return 'Dezembro/2024'
      default:
        return ''
    }
  }

  const onViewableItemsChanged = ({ viewableItems, changed }:any) => {
    const currentYear = moment(new Date()).format('YYYY');
    let month = viewableItems[0]?.item?.month
    
    if (month.length < 2) {
      month = "0" + month
    }

    const filter = currentYear + "-" + month
    setDate(filter)
  }

  return (
    <VStack style={styles.container}>
      <Box style={{marginBottom: 30}}>
        <Select
          selectedValue={date}
          onValueChange={getByStartDate}
          dropdownIcon={
            <Icon
              as = {
                <MaterialCommunityIcons
                  name={'calendar-blank'}
                  style={styles.selectIcon}
                />
              }
            />
          }
          color={THEME.colors.font}
          fontFamily={'InterTight_600SemiBold'}
          fontWeight={'600'}
          fontSize={THEME.fontSizes.md}
          borderColor={THEME.colors.header}
          bg={THEME.colors.header}
        >
          {
            months.map(item => {
              return <Select.Item
                label={item.label}
                value={item.key}
                id={item.key}
                key={item.key}
                _text={{
                  color: THEME.colors.backgroud,
                  fontFamily: 'InterTight_400Regular',
                  fontWeight: '400',
                  fontSize: THEME.fontSizes.md,
                }}
              />
            })
          }
        </Select>
      </Box>

      <FlatList
        data={schedules}
        keyExtractor={(item:ScheduleDTO) => item?.month}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item}) => (
          <Box mb={5}>
            <Text style={styles.title}>{getMonth(item?.month)}</Text>
            {
              item?.scheduleList.length > 0 ?
              (
                <View>
                  <FlatList
                    data={item?.scheduleList}
                    keyExtractor={(schedule:Schedule) => schedule?.id.toString()}
                    renderItem={
                      ({item}) => (
                        <Box style={styles.section} key={item.id}>
                          <Box style={styles.areaDate}>
                            <Box style={styles.circleDate}>
                              <Text style={styles.date}>
                                {getDate(item.startDate, 'DD')}
                              </Text>
                            </Box>
                      
                            <Text style={styles.dayWeek}>
                              {getDate(item.startDate, 'ddd')}
                            </Text>
                          </Box>
                          <Text style={styles.label}>
                            {item.title + ' às ' + getDate(item.startDate, 'LT')} 
                          </Text>
                        </Box>
                      )
                    }
                  />
                </View>
              )
              :
              (
                <Box p={5}>
                  <Text style={styles.withoutEvent}>
                    Ainda não foi cadastrado nenhum evento.
                  </Text>
                </Box>
              )
            }
          </Box>
        )}
      />
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
    paddingBottom: 10 + THEME.sizes.paddingPage,
  },
  input: {
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.md,
    color: THEME.colors.font
  },
  selectIcon: {
    padding: THEME.sizes.paddingPage + 5,
    fontSize: THEME.fontSizes.lg,
    color: THEME.colors.primary,
  },
  title: {
    fontSize: THEME.fontSizes.md,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.font,
    paddingBottom: 10,
  },
  withoutEvent: {
    fontSize: THEME.fontSizes.sm,
    fontFamily: 'InterTight_300Light',
    fontWeight: '300',
    color: THEME.colors.font,
    textAlign:'center',
  },
  section: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.header,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  areaDate: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20
  },
  circleDate: {
    padding: THEME.fontSizes.sm / 2,
    borderRadius: THEME.fontSizes.sm + 10,
    backgroundColor: THEME.colors.primary,
    marginBottom: 7,
  },
  date: {
    color: THEME.colors.backgroud,
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    fontFamily: 'InterTight_500Medium',
    fontWeight: '500',
  },
  dayWeek: {
    color: THEME.colors.primary,
    fontSize: THEME.fontSizes.sm - 3,
    lineHeight: THEME.fontSizes.sm - 3,
    textTransform: 'uppercase',
    fontFamily: 'InterTight_500Medium',
    fontWeight: '500',
  },
  label: {
    color: THEME.colors.font,
    fontSize: THEME.fontSizes.sm,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    textTransform: 'uppercase',
  }
})