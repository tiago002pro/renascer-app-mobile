import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, FlatList, Text, VStack, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import ScheduleService from "../service/ScheduleService";
import ScheduleComponent from "../components/ScheduleComponent";
import Loading from "../../Loading";
import { THEME } from "../../../styles/theme";

type Schedule = {
  id: string,
  title: string,
  startDate: Date,
  endDate: Date,
  address: string,
  description: string,
  image: string,
  registration: boolean,
  deadline: Date,
}

export function Schedule() {
  const [schedules, setSchedules] = useState([]) as any[];

  useEffect(() => {
    async function getSchedule() {
      const result:any[] = await ScheduleService.getAllByValidDeadline()
      setSchedules(result)
    }
    getSchedule()
  }, [])

  if (!schedules) {
    return <Loading/>;
  }

  return (
    <VStack style={styles.container}>
      {schedules.length > 0 ? 
        <View>
          <Text style={styles.title}>Próximos eventos</Text>
          <FlatList
            data={schedules}
            keyExtractor={(item:any) => item.id.toString()}
            renderItem={
              ({item}) => <ScheduleComponent item={item} />
            }
          />
        </View>
        :
        <View style={styles.without}>
          <Box mb={3}>
            <FontAwesome5 name="calendar-times" color={THEME.colors.primary} size={50}/>
          </Box>
          <Box alignItems={'center'}>
            <Text style={[styles.withoutText, {marginBottom: 5}]}>Nenhum evento</Text>
            <Text style={styles.withoutText}>encontrado</Text>
          </Box>
        </View>
      }
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
  },
  title: {
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.white,
    marginBottom: 20,
  },
  without: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withoutText: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.white,
  }
})