import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, Image, ScrollView, Text, View } from "native-base";

import VideoService from "../Videos/service/VideoService";

import { SlideVideo } from "../Videos/components/SlideVideo";

import { THEME } from "../../styles/theme";

const { width, height } = Dimensions.get('screen');

export function Dashboard() {
  const [latestVideos, setLatestVideos] = useState(null) as any[];
  const [lastVideos, setLastVideos] = useState(null) as any;

  useEffect(() => {
    async function getLatest() {
      const result:any[] = await VideoService.getLatest()
      if (result && result.length > 0) {
        result.shift()
        setLatestVideos(result)
        setLastVideos(result[0])
      }
    }
    getLatest()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Box>
          <Image
            source={{uri: lastVideos?.coverImage}}
            alt={'coverImage'}
            key={lastVideos?.id.toString()}
            w={width}
            h={height * .27}
          />
          <Box style={styles.titleVideo}>
            <Text style={styles.text} numberOfLines={1}>
              {lastVideos?.title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>
              {lastVideos?.author}
            </Text>
          </Box>
        </Box>

        <View style={styles.view}>
          <Box>
            <SlideVideo
              data={latestVideos}
            />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleVideo: {
    width: width - THEME.sizes.paddingPage * 2,
    position: 'absolute',
    bottom: 0,
    marginLeft: THEME.sizes.paddingPage,
    marginRight: THEME.sizes.paddingPage,
    marginBottom: THEME.sizes.paddingPage,
    padding: THEME.sizes.paddingPage,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    color: THEME.colors.white,
    fontFamily: 'Roboto_700Bold',
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  author: {
    color: THEME.colors.white,
    fontFamily: 'Roboto_400Regular',
    fontSize: THEME.fontSizes.xs,
    lineHeight: THEME.fontSizes.xs,
    textTransform: 'capitalize',
  },
  view: {
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
});
