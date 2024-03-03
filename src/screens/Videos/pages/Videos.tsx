import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text, VStack, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';

import VideoService from "../service/VideoService";

import { SlideVideoFeatured } from "../components/SlideVideoFeatured";
import { SlideVideo } from "../components/SlideVideo";

import { THEME } from "../../../styles/theme";

export function Videos() {
  const [latestVideos, setLatestVideos] = useState(null) as any[];
  const [celebrationService, setCelebrationService] = useState(null) as any[];

  useEffect(() => {
    async function getLatest() {
      const result:any[] = await VideoService.getLatest()
      setLatestVideos(result)
    }

    async function getAllMusic() {
      const result:any[] = await VideoService.getAllByCategory('CELEBRATION')
      setCelebrationService(result)
    }
    
    getLatest()
    getAllMusic()
  }, [])


  return (
    <VStack style={styles.container}>
      <ScrollView>
        {
          (latestVideos && latestVideos.length > 0) && (celebrationService && celebrationService.length > 0) ?
          <View>
            <Box style={styles.slide}>
              <SlideVideoFeatured
                title={"Em destaque"}
                data={latestVideos}
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
              <FontAwesome5 name="video-slash" color={THEME.colors.yellow[400]} size={50}/>
            </Box>
            <Text color={'white'} fontSize={"lg"} textAlign={'center'}>Nenhum vídeo</Text>
            <Text color={'white'} fontSize={"lg"} textAlign={'center'}>foi encontrado</Text>
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
  }
});
