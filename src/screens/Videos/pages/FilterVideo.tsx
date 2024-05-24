import { Box, FlatList, Image, Text, View } from "native-base";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { THEME } from "../../../styles/theme";
import React, { useState } from "react";
import InputTextIcon from "../../../components/InputTextIcon";
import VideoService from "../service/VideoService";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('screen');
const imageW = width * 0.45;
const imageH = imageW * .54;

export function FilterVideo() {
  const navigation:any = useNavigation();
  const [search, setSearch] = useState('');
  const [latestVideos, setLatestVideos] = useState([]);

  async function onChangeSearch(search:string) {
    setSearch(search);
    const result:any = await VideoService.searchVideos(search)
    setLatestVideos(result)
  }

  async function goWathVideo(video: any): Promise<void> {
    navigation.navigate('WatchVideo', {
      video: video
    });
  }

  return (
    <View style={styles.container}>
      <Box style={styles.inputSerch}>
        <InputTextIcon
          placeholder={"Search"}
          icon={"search"}
          autoCapitalize={false}
          value={search}
          onChangeText={onChangeSearch}
          show={true}
          error={false}
        />
      </Box>

      <FlatList
        data={latestVideos}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item:any) => item.id.toString()}
        renderItem={({item}:any) => {
          return <TouchableWithoutFeedback onPress={() => goWathVideo(item)}>
            <View style={styles.videoContainer}>
              <Box style={styles.imageArea}>
                <Image
                  source={{uri: `https://img.youtube.com/vi/${item.videoId}/0.jpg`}}
                  alt={item.title}
                  style={styles.image}
                  key={item.id.toString()}
                />
              </Box>
              <Box style={styles.description}>
                <Text style={styles.titleVideo} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.authorVideo} numberOfLines={2}>
                  {item.author}
                </Text>
              </Box>
            </View>
          </TouchableWithoutFeedback>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroud,
    padding: THEME.sizes.paddingPage,
  },
  inputSerch: {
    marginBottom: THEME.sizes.paddingPage * 2,
  },
  videoContainer: {
    width: imageW,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageArea: {
    width: imageW - 10,
    height: imageH,
    backgroundColor: THEME.colors.primary,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 10,
    backgroundColor: THEME.colors.black,
    objectFit: 'cover',
  },
  description: {
    padding: 10,
  },
  titleVideo: {
    fontSize: THEME.fontSizes.text,
    lineHeight: THEME.fontSizes.text,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: 600,
    color: THEME.colors.white,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  authorVideo: {
    fontSize: THEME.fontSizes.subText,
    lineHeight: THEME.fontSizes.subText,
    fontFamily: 'InterTight_400Regular',
    fontWeight: 400,
    color: THEME.colors.gray[200],
    textTransform: 'capitalize',
  }
})