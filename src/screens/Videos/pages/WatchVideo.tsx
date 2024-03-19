import { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { Box, Text, View } from "native-base";
import * as ScreenOrientation from 'expo-screen-orientation';
import { THEME } from "../../../styles/theme";
import YoutubeIframe from "react-native-youtube-iframe";


const { width, height } = Dimensions.get('screen');
export const VIDEO_WIDTH = width;
export const VIDEO_HEIGHT = height * .27;

export function WatchVideo({ route }:any) {
  const { video } = route.params; 
  const [videoReady, setVideoReady] = useState(false);

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }  else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [])

  return (
    <View style={styles.container}>
      <Box style={styles.player}>
        <YoutubeIframe
          videoId={video.videoId}
          width={VIDEO_WIDTH}
          height={videoReady ? VIDEO_HEIGHT : 0}
          onReady={() => setVideoReady(true)}
          onFullScreenChange={onFullScreenChange}
        />
        {!videoReady && <ActivityIndicator color={THEME.colors.yellow[400]}/>}
      </Box>

      <Box style={styles.descriptionPlayer}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.speaker}>Preletor {video.author}</Text>
        <Text style={styles.description}>{video.description}</Text>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    alignItems: 'center',
  },
  player: {
    width: width,
    height: VIDEO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: THEME.sizes.paddingPage
  },
  descriptionPlayer: {
    width: width,
    padding: THEME.sizes.paddingPage,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    color: THEME.colors.font,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  speaker: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 15,
  },
  description: {
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    color: THEME.colors.font,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'justify'
  }
});