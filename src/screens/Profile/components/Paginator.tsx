import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

import { THEME } from "../../../styles/theme";

interface PaginatorProps {
  data?:any;
  scrollx?:any;
}

export function Paginator({ data, scrollx }:PaginatorProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        // const dotWidth = scrollx.interpolate({
        //   inputRange,
        //   outputRange: [10, 40, 10],
        //   extrapolate: 'clamp'
        // })

        const dotWidth = (width / data.length) - 15;

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: THEME.sizes.paddingPage * 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
  dot: {
    height: 5,
    borderRadius: 3,
    backgroundColor: THEME.colors.white,
  },
});
