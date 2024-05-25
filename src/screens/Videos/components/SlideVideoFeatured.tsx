import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, FlatList, Image, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';

import { THEME } from "../../../styles/theme";

const { width } = Dimensions.get('screen');
const imageW = width * 0.80;
const imageH = imageW * .54;

export function SlideVideoFeatured({ title, data }:any) {
  const navigation:any = useNavigation();

  async function goWathVideo(video: any): Promise<void> {
    navigation.navigate('WatchVideo', {
      video: video
    });
  }

  return (
    <View key={title}>
      <Box style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </Box>

      <Box>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item:any) => item.id.toString()}
          renderItem={({item}:any) => {
            return <TouchableWithoutFeedback onPress={() => goWathVideo(item)}>
              <View style={styles.videoContainer}>
                <Box style={styles.imageArea}>
                  <Image
                    source={{uri: `https://img.youtube.com/vi/${item.videoId}/0.jpg`}}
                    alt={item.coverImage}
                    style={styles.image}
                    key={item.id.toString()}
                  />
                  <FontAwesome5 name="play" color={THEME.colors.white} size={70} style={styles.playIcon}/>
                </Box>
                <Box style={styles.description}>
                  <Text
                    style={styles.titleVideo}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={styles.authorVideo}
                    numberOfLines={1}
                  >
                    {item.author}
                  </Text>
                </Box>
              </View>
            </TouchableWithoutFeedback>
          }}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: THEME.fontSizes.title,
    lineHeight: THEME.fontSizes.title,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.white,
  },
  videoContainer: {
    width: imageW,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageArea: {
    width: imageW - 10,
    height: imageH,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.primary,
    borderRadius: 15,
  },
  image: {
    width: imageW - 10,
    height: imageH,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: THEME.colors.black,
    objectFit: 'cover',
  },
  playIcon: {
    position: 'absolute',
    opacity: .7,
  },
  description: {
    width: imageW - 10,
    padding: 10,
    backgroundColor: THEME.colors.header,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  titleVideo: {
    fontSize: THEME.fontSizes.text,
    lineHeight: THEME.fontSizes.text,
    fontFamily: 'InterTight_600SemiBold',
    fontWeight: '600',
    color: THEME.colors.white,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  authorVideo: {
    fontSize: THEME.fontSizes.subText,
    lineHeight: THEME.fontSizes.subText,
    fontFamily: 'InterTight_400Regular',
    fontWeight: '400',
    color: THEME.colors.gray[200],
    textTransform: 'capitalize',
  }
});
