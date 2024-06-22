import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, Text, VStack, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import VideoService from "../service/VideoService";
import { SlideVideoFeatured } from "../components/SlideVideoFeatured";
import { SlideVideo } from "../components/SlideVideo";
import { THEME } from "../../../styles/theme";
import Loading from "../../Loading";

export function Videos() {
  const [featured , setFeatured] = useState([]);
  const [conference, setConference] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function getLatest() {
      const result:any = await VideoService.getLatest()
      setFeatured(result)
    }

    async function getRecentVideos() {
      const result:any = await VideoService.getAllByCategory("ALL")
      setRecent(result)
    }

    async function getConferenceVideos() {
      const result:any = await VideoService.getAllByCategory('CONFERENCE')
      setConference(result)
    }
    
    getLatest()
    getRecentVideos()
    getConferenceVideos()
  }, [])

  function checkVideos():boolean {
    return featured.length > 0 && conference.length > 0 && recent.length > 0
  }

  if (!featured || !conference || !recent) {
    return <Loading/>;
  }

  return (
    <VStack style={styles.container}>
      {checkVideos() ?
        <ScrollView>
          <View>
            <Box style={styles.slide}>
              <SlideVideoFeatured
                title={"Em destaque"}
                data={featured}
              />
            </Box>

            <Box style={styles.slide}>
              <SlideVideo
                title={"Adicionados recentemente"}
                data={recent}
              />
            </Box>

            <Box style={styles.slide}>
              <SlideVideo
                title={"Conferências"}
                data={conference}
              />
            </Box>
          </View>
        </ScrollView>
      :
      <View style={styles.without}>
        <Box mb={3}>
          <FontAwesome5 name="video-slash" color={THEME.colors.primary} size={50}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
  },
  slide: {
    marginBottom: 40
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
    color: THEME.colors.white,
  }
});
