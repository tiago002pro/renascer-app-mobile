import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, FlatList, Text, VStack, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

import ScheduleService from "../service/ScheduleService";

import ScheduleComponent from "../components/ScheduleComponent";

import { THEME } from "../../../styles/theme";
const { height } = Dimensions.get('window');

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

  return (
    <VStack style={styles.container} safeArea>
      {schedules && schedules.length > 0 ? 
        <View>
          <Text style={styles.title}>Próximos eventos</Text>
          <FlatList
            data={schedules}
            renderItem={
              ({item}) => <ScheduleComponent item={item} />
            }
            keyExtractor={(item:any) => item.id.toString()}
          />
        </View>
        :
        <View alignItems={'center'} justifyContent={'center'} mt={'50%'} >
          <Box mb={3}>
            <FontAwesome5 name="calendar-times" color={THEME.colors.yellow[400]} size={50}/>
          </Box>
          <Text color={'white'} fontSize={"lg"} textAlign={'center'}>Nenhum evento</Text>
          <Text color={'white'} fontSize={"lg"} textAlign={'center'}>foi encontrado</Text>
        </View>
      }
    </VStack>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
    paddingBottom: 10 + THEME.sizes.paddingPage,
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontWeight: 'bold',
    color: THEME.colors.white,
    paddingBottom: 10,
  }
})