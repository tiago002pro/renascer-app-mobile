import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, Image, ScrollView, Text, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import VideoService from "../Videos/service/VideoService";

import { SlideVideo } from "../Videos/components/SlideVideo";

import { THEME } from "../../styles/theme";

const { width, height } = Dimensions.get('screen');

export function Dashboard() {
  const navigation:any = useNavigation();
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

  async function goWathVideo(video:any):Promise<void> {
    navigation.navigate('WatchVideo', {
      video: video
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Box>
          <TouchableWithoutFeedback onPress={() => goWathVideo(lastVideos)}>
            <Box style={styles.imageArea}>
              <Image
                source={{uri: lastVideos?.coverImage}}
                alt={'coverImage'}
                key={lastVideos?.id.toString()}
                w={width}
                h={height * .27}
              />
              <FontAwesome5 name="play" color={THEME.colors.white} size={70} style={styles.playIcon}/>
            </Box>
          </TouchableWithoutFeedback>

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
          <Box style={styles.latestVideos}>
            <SlideVideo
              data={latestVideos}
            />
          </Box>

          <Box style={styles.themeYear}>
            <Text style={styles.title}>Destaque</Text>
            <Image
              source={require('../../../assets/images/TEMA_ANO.png')}
              alt={"Tema do ano"}
              style={styles.image}
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
  imageArea: {
    width: width,
    height: height * .27,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    position: 'absolute',
    opacity: .5,
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
  latestVideos: {
    marginBottom: 20,
  },
  themeYear: {
    marginBottom: 20,
  },
  image: {
    width: width - THEME.sizes.paddingPage * 2,
    height: height * .24,
    borderRadius: 5,
    backgroundColor: THEME.colors.gray[500]
    
  },
  title: {
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontFamily: 'Roboto_700Bold',
    color: THEME.colors.white,
    marginBottom: 10,
  },
});
