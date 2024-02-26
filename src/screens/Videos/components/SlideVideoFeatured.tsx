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
                    fontSize={14}
                    lineHeight={14}
                    color={THEME.colors.white}
                    fontWeight={'400'}
                    numberOfLines={1}
                    textTransform={'uppercase'}
                    mt={2}
                    mb={2}
                  >
                    {item.title}
                  </Text>

                  <Text
                    fontSize={10}
                    lineHeight={10}
                    letterSpacing={1}
                    color={THEME.colors.gray[200]}
                    numberOfLines={1}
                    textTransform={'uppercase'}
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
    fontSize: THEME.fontSizes.lg,
    lineHeight: THEME.fontSizes.lg,
    fontWeight: 'bold',
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
    borderRadius: 2,
    backgroundColor: THEME.colors.black,
  },
  description: {
    width: imageW - 10,
  }
});
