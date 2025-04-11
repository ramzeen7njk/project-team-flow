import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  const logoAnim = useRef(new Animated.Value(0)).current;

  // Flip + Zoom animation
  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    // After animation + loader, navigate to home
    const timeout = setTimeout(() => {
      router.replace('/(tabs)');
    }, 5500); // 2.5s animation + 3s loader

    return () => clearTimeout(timeout);
  }, []);

  const rotateY = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const scale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <LinearGradient
      colors={['#c294ff', '#4a9bed']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { rotateY },
              { scale },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/applogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backfaceVisibility: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  loader: {
    marginTop: 10,
  },
});
