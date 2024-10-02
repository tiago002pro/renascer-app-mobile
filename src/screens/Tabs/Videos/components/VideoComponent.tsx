import { Box, Image, Text, View } from "native-base";
import { THEME } from "../../../../styles/theme";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import VideoService from "../service/VideoService";
import { ActivityIndicator } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('screen');
const imageW = width * 0.45;
const imageH = imageW * .54;

export function VideoComponent({ search }:any) {
  const [videos, setVideos] = useState<any[]>(search.videos);
  const [loading, setLoading] = useState<boolean>(search.loading) as any;
  const [page, setPage] = useState<number>(search.page);
  const [hasMore, setHasMore] = useState<boolean>(search.hasMore);

  useEffect(() => {
    loadVideos();
  }, [page]);

  async function loadVideos() {
    if (loading) return;
    setLoading(true);
    const videoList = await VideoService.getAllByCategory(search.category, page);
    setVideos([...videos, ...videoList]);
    if (videoList.length === 0) { setHasMore(false); }
    setLoading(false);
  }

  function handleLoadMore() {
    if (hasMore) {
      setPage(page + 1);
    }
  }

  const renderVideo = useCallback(({ item }:any) => {
    return <Video video={item}/>
  }, [videos])

  return(
    <View>
      <Text style={styles.title}>{search.label}</Text>
      <FlatList
        data={videos}
        horizontal
        renderItem={renderVideo}
        keyExtractor={(item:any) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={3}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={loading &&
          <Box style={videoStyle.imageArea}>
            <ActivityIndicator size="large" color={THEME.colors.primary} />
          </Box>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 2,
    fontSize: THEME.fontSizes.md,
    lineHeight: THEME.fontSizes.md,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.font,
  },
});

function Video({ video }:any) {
  const navigation:any = useNavigation();

  async function goWathVideo(video: any): Promise<void> {
    navigation.navigate('WatchVideo', {
      video: video
    });
  }

  return (
    <TouchableWithoutFeedback
      key={video.id}
      style={videoStyle.videoContainer}
      onPress={() => goWathVideo(video)}
    >
      <Box style={videoStyle.imageArea}>
        <Image
          source={{uri: `https://img.youtube.com/vi/${video.videoId}/0.jpg`}}
          alt={video.title}
          style={videoStyle.image}
          key={video.id.toString()}
        />
        <FontAwesome5 name="play" color={THEME.colors.font} size={40} style={videoStyle.playIcon}/>
      </Box>
      <Box style={videoStyle.description}>
        <Text style={videoStyle.titleVideo} numberOfLines={1}>{video.title}</Text>
        <Text style={videoStyle.authorVideo} numberOfLines={1}>{video.author}</Text>
      </Box>
    </TouchableWithoutFeedback>
  );
}

const videoStyle = StyleSheet.create({
  videoContainer: {
    width: imageW,
  },
  imageArea: {
    backgroundColor: THEME.colors.header,
    width: imageW - 10,
    height: imageH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 10,
    backgroundColor: THEME.colors.black,
    objectFit: 'cover',
  },
  playIcon: {
    position: 'absolute',
    opacity: .7,
  },
  description: {
    width: imageW - 10,
    marginTop: 4,
  },
  titleVideo: {
    fontSize: THEME.fontSizes.sm,
    lineHeight: THEME.fontSizes.sm,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.font,
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  authorVideo: {
    fontSize: THEME.fontSizes.sm - 3,
    lineHeight: THEME.fontSizes.sm - 3,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    color: THEME.colors.gray[200],
    textTransform: 'capitalize',
  }
});