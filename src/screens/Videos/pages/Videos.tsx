import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text, VStack, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

import VideoService from "../service/VideoService";

import { SlideVideoFeatured } from "../components/SlideVideoFeatured";
import { SlideVideo } from "../components/SlideVideo";

import { THEME } from "../../../styles/theme";

export function Videos() {
  const [latestVideos, setLatestVideos] = useState([]);
  const [familyService, setFamilyService] = useState([]);
  const [celebrationService, setCelebrationService] = useState([]);

  useEffect(() => {
    async function getLatest() {
      const result:any = await VideoService.getLatest()
      setLatestVideos(result)
    }

    async function getFamilyService() {
      const result:any = await VideoService.getAllByCategory('FAMILY')
      setFamilyService(result)
    }

    async function getCelebrationService() {
      const result:any = await VideoService.getAllByCategory('CELEBRATION')
      setCelebrationService(result)
    }
    
    getLatest()
    getFamilyService()
    getCelebrationService()
  }, [])

  function checkVideos():boolean {
    return (latestVideos && latestVideos.length > 0) 
      && (familyService && familyService.length > 0)
      && (celebrationService && celebrationService.length > 0)
  }

  return (
    <VStack style={styles.container}>
      <ScrollView>
        {
          checkVideos() ?
          <View>
            <Box style={styles.slide}>
              <SlideVideoFeatured
                title={"Em destaque"}
                data={latestVideos}
              />
            </Box>

            <Box style={styles.slide}>
              <SlideVideo
                title={"Culto da familia"}
                data={familyService}
              />
            </Box>

            <Box style={styles.slide}>
              <SlideVideo
                title={"Culto de celebração"}
                data={celebrationService}
              />
            </Box>
          </View>
          :
          <View alignItems={'center'} justifyContent={'center'} mt={'50%'} >
            <Box mb={3}>
              <FontAwesome5 name="video-slash" color={THEME.colors.primary} size={50}/>
            </Box>
            <Text style={styles.title} textAlign={'center'}>Nenhum vídeo</Text>
            <Text style={styles.title} textAlign={'center'}>foi encontrado</Text>
          </View>
        }
      </ScrollView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
  },
  slide: {
    marginBottom: 30
  },
  title: {
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title,
    fontFamily: 'Roboto_700Bold',
    color: THEME.colors.white,
    paddingBottom: 10,
  }
});
