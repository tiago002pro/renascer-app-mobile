import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, Image, ScrollView, Text, View } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../../../styles/theme";
import NotificationService from "../../Profile/service/NotificationService";
import { useAuth } from "../../../contexts/auth";

const { width } = Dimensions.get('screen');
const heightBannerImg = width * .56;

import temaAnoImage from './../../../../assets/images/TEMA_ANO.jpg'
import { SearchProps } from "../Videos/VideoScreen";
import { VideoComponent } from "../Videos/components/VideoComponent";
import VideoService from "../Videos/service/VideoService";
import { ActivityIndicator } from "react-native-paper";

const search:SearchProps = {
  id: 1,
  videos: [],
  loading: false,
  page: 0,
  hasMore: true,
  category: '',
  label: '',
}

export function Dashboard() {
  const { user } = useAuth() as any;
  const navigation:any = useNavigation();
  const [lastVideo, setLastVideo] = useState(null) as any;

  useEffect(() => {
    loadLastVideo()
    checkIfThereAreNotifications()
  }, [])

  async function loadLastVideo() {
    const lastVideo = await VideoService.getLastVideo();
    setLastVideo(lastVideo)
  }

  async function checkIfThereAreNotifications() {
    if (user && user.id) {
      NotificationService.checkIfThereAreNotifications(user.id).then((reponse) => {
        navigation.setParams({ hasNotification: reponse });
      })
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.areaVideos}>
          <VideoBanner video={lastVideo} />
          <Box style={styles.videoComponent}>
            <VideoComponent search={search} />
          </Box>
        </View>

        <View style={styles.view}>
          <Box style={styles.themeYear}>
            <Text style={styles.title}>Destaques</Text>
            <Image
              source={temaAnoImage}
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
  videoComponent: {
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
    color: THEME.colors.font,
    marginBottom: 10,
  },
});

function VideoBanner({ video }:any) {
  const navigation:any = useNavigation();

  async function goWathVideo(video:any):Promise<void> {
    navigation.navigate('WatchVideo', {
      video: video
    });
  }

  return (
    <View style={videoBannerStyles.container}>
      {
        video ? 
        <Box>
          <TouchableWithoutFeedback onPress={() => goWathVideo(video)}>
            <Box style={videoBannerStyles.imageArea}>
              <Image
                source={{uri: `https://img.youtube.com/vi/${video?.videoId}/0.jpg`}}
                alt={video?.title}
                key={video?.id.toString()}
                h={'full'}
                style={videoBannerStyles.image}
              />
              <FontAwesome5 name="play" color={THEME.colors.font} size={70} style={videoBannerStyles.playIcon}/>
            </Box>
          </TouchableWithoutFeedback>

          <Box style={videoBannerStyles.titleVideo}>
            <Text style={videoBannerStyles.text} numberOfLines={1}>{video?.title}</Text>
            <Text style={videoBannerStyles.author} numberOfLines={1}>{video?.author}</Text>
          </Box>
        </Box>
        :
        <Box style={videoBannerStyles.imageArea}>
          <ActivityIndicator size="large" color={THEME.colors.primary} />
        </Box>
      }
    </View>
  );
}

const videoBannerStyles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  imageArea: {
    width: width,
    height: heightBannerImg,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.header,
  },
  image: {
    width,
    objectFit: 'cover',
    backgroundColor: THEME.colors.header,
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
    color: THEME.colors.font,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    fontSize: THEME.fontSizes.subTitle,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  author: {
    color: THEME.colors.font,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    fontSize: THEME.fontSizes.subText,
    textTransform: 'capitalize',
  },
});