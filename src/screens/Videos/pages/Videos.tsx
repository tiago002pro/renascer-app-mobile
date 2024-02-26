import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Box, ScrollView, VStack } from "native-base";

import VideoService from "../service/VideoService";

import { SlideVideoFeatured } from "../components/SlideVideoFeatured";
import { SlideVideo } from "../components/SlideVideo";
import { THEME } from "../../../styles/theme";


export function Videos() {
  const [familyService, setFamilyService] = useState(null);
  const [celebrationService, setCelebrationService] = useState(null);

  useEffect(() => {
    async function getAllSermon() {
      const result:any = await VideoService.getAllByCategory('FAMILY')
      setFamilyService(result)
    }

    async function getAllMusic() {
      const result:any = await VideoService.getAllByCategory('CELEBRATION')
      setCelebrationService(result)
    }
    
    getAllSermon()
    getAllMusic()
  }, [])


  return (
    <VStack style={styles.container} safeArea>
      <ScrollView>
        <Box style={styles.slide}>
          <SlideVideoFeatured
            title={"Culto da família"}
            data={familyService}
          />
        </Box>

        <Box style={styles.slide}>
          <SlideVideo
            title={"Culto de celebração"}
            data={celebrationService}
          />
        </Box>
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
