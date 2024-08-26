import { Box, VStack } from "native-base";
import { THEME } from "../../../styles/theme";
import { FlatList, StyleSheet } from "react-native";
import { LatestVideos } from "../components/LatestVideos";
import { VideoComponent } from "../components/VideoComponent";

export type SearchProps = {
  id:number,
  videos:any[],
  loading:boolean,
  page:number,
  hasMore:boolean,
  category:string,
  label:string,
}

const searchList:SearchProps[] = [
  {
    id: 1,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'PENTECOSTES',
    label: 'Pentecostes',
  },
  {
    id: 2,
    videos: [],
    loading: false,
    page: 0,
    hasMore: true,
    category: 'TRILHA_DE_MATURIDADE',
    label: 'Trilha de Maturidade',
  },
  {
    id: 3,
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