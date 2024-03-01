import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, FlatList, Image, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
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
                <Image
                  source={{uri: item.coverImage}}
                  alt={item.coverImage}
                  style={styles.image}
                  key={item.id.toString()}
                />
                <Box style={styles.description}>
                  <Text
                    color={THEME.colors.white}
                    textTransform={'capitalize'}
                    fontSize={THEME.fontSizes.md}
                    lineHeight={THEME.fontSizes.md}
                    fontFamily={'Roboto_700Bold'}
                    numberOfLines={1}
                    mb={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    color={THEME.colors.gray[200]}
                    textTransform={'capitalize'}
                    fontSize={THEME.fontSizes.md - 5}
                    lineHeight={THEME.fontSizes.md - 5}
                    fontFamily={'Roboto_400Regular'}
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
    fontSize: THEME.fontSizes.xl,
    lineHeight: THEME.fontSizes.xl,
    fontFamily: 'Roboto_700Bold',
    color: THEME.colors.white,
  },
  videoContainer: {
    width: imageW,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: imageW - 10,
    height: imageH,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: THEME.colors.black,
  },
  description: {
    width: imageW - 10,
    padding: 10,
    backgroundColor: THEME.colors.header,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }
});
