import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, Image, ScrollView, Text, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import VideoService from "../Videos/service/VideoService";

import { SlideVideo } from "../Videos/components/SlideVideo";

import { THEME } from "../../styles/theme";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get('screen');
const heightBannerImg = width * .56;

export function Dashboard() {
  const navigation:any = useNavigation();
  const [latestVideos, setLatestVideos] = useState(null) as any;
  const [lastVideo, setLastVideo] = useState(null) as any;
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    async function getLatest() {
      const result:any[] = await VideoService.getLatest()
      if (result && result.length > 0) {
        setLastVideo(result[0])
        result.shift()
        setLatestVideos(result)
        setLoadingVideos(true)
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
        {
          loadingVideos ? 
          <View style={styles.areaVideos}>
            <Box style={styles.videoBanner}>
              <TouchableWithoutFeedback onPress={() => goWathVideo(lastVideo)}>
                <Box style={styles.imageArea}>
                  <Image
                    source={{uri: `https://img.youtube.com/vi/${lastVideo?.videoId}/0.jpg`}}
                    alt={lastVideo?.title}
                    key={lastVideo?.id.toString()}
                    w={width}
                    h={'full'}
                    style={{objectFit: 'cover'}}
                  />
                  <FontAwesome5 name="play" color={THEME.colors.white} size={70} style={styles.playIcon}/>
                </Box>
              </TouchableWithoutFeedback>

              <Box style={styles.titleVideo}>
                <Text style={styles.text} numberOfLines={1}>
                  {lastVideo?.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                  {lastVideo?.author}
                </Text>
              </Box>
            </Box>

            <Box style={styles.latestVideos}>
              <SlideVideo
                data={latestVideos}
              />
            </Box>
          </View>
          :
          <Box style={styles.loading}>
            <ActivityIndicator size={"large"} color={THEME.colors.primary} />
          </Box>
        }

        <View style={styles.view}>
          <Box style={styles.themeYear}>
            <Text style={styles.title}>Destaques</Text>
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
  areaVideos: {
    marginBottom: 30,
  },
  videoBanner: {
    marginBottom: 5,
  },
  imageArea: {
    width: width,
    height: heightBannerImg,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
  },
  playIcon: {
    position: 'absolute',
    opacity: .7,
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
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.subTitle,
    lineHeight: THEME.fontSizes.subTitle,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  author: {
    color: THEME.colors.white,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    fontSize: THEME.fontSizes.subText,
    lineHeight: THEME.fontSizes.subText,
    textTransform: 'capitalize',
  },
  latestVideos: {
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
  view: {
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
  themeYear: {
    marginBottom: 30,
  },
  image: {
    width: width - THEME.sizes.paddingPage * 2,
    height: width * .55,
    borderRadius: 5,
    backgroundColor: THEME.colors.black,
  },
  title: {
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.white,
    marginBottom: 10,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * .5,
  }
});
