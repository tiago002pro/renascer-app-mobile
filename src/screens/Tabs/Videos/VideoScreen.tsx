import { Box, VStack } from "native-base";
import { THEME } from "../../../styles/theme";
import { FlatList, StyleSheet } from "react-native";
import { LatestVideos } from "./components/LatestVideos";
import { VideoComponent } from "./components/VideoComponent";
import { SearchVideosProps } from "../../../types/video-search";

const searchList:SearchVideosProps[] = [
  {
    id: 1,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'OTHERS',
    label: 'Vídeos',
  },
  {
    id: 2,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'MILAGRES',
    label: 'Milagres',
  },
  {
    id: 3,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'PENTECOSTES',
    label: 'Pentecostes',
  },
  {
    id: 4,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'TRILHA_DE_MATURIDADE',
    label: 'Trilha de Maturidade',
  },
  {
    id: 5,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'CONFERENCE',
    label: 'Conferências',
  }
]

export default function VideoScreen() {

  return (
    <VStack style={styles.container}>
      <Box style={styles.section}>
        <LatestVideos/>
      </Box>

      <FlatList
        data={searchList}
        renderItem={({ item }:any) => (
          <Box style={styles.section} key={item.id}>
            <VideoComponent search={item} />
          </Box>
        )}
        keyExtractor={(item:any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />     
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
  },
  section: {
    marginBottom: 30,
  }
});