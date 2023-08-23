import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const isPressed = useSharedValue(false);

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onChange(event => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      isPressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offsetX.value},
      {translateY: offsetY.value},
      {scale: withTiming(isPressed.value ? 1.2 : 1)},
    ],
    backgroundColor: isPressed.value
      ? 'rgba(0,255,0,0.5)'
      : 'rgba(0,0,255,0.5)',
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,255,0.5)',
  },
});

export default App;
