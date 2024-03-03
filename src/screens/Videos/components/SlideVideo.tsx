import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Box, FlatList, Image, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../styles/theme";

const { width } = Dimensions.get('screen');
const imageW = width * 0.45;
const imageH = imageW * .54;

export function SlideVideo({ title, data }:any) {
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
                    fontSize={THEME.fontSizes.sm}
                    lineHeight={THEME.fontSizes.sm}
                    fontFamily={'Roboto_700Bold'}
                    numberOfLines={1}
                    mt={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color={THEME.colors.gray[200]}
                    textTransform={'capitalize'}
                    fontSize={THEME.fontSizes.sm - 5}
                    lineHeight={THEME.fontSizes.sm - 5}
                    fontFamily={'Roboto_400Regular'}
                    numberOfLines={1}
                    mt={1}
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
    marginBottom: 5,
  },
  title: {
    fontSize: THEME.fontSizes.sm,
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
    borderRadius: 10,
    backgroundColor: THEME.colors.black,
  },
  description: {
    width: imageW - 10,
  }
});