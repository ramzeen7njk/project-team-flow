import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';

export default function Splash() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLoader(true);

      setTimeout(() => {
        router.replace('/'); // navigates to home tab after loading
      }, 3000); // loader time
    });
  }, []);

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  return (
    <LinearGradient
      colors={['#c294ff', '#4a9bed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }, { rotateY }],
          },
        ]}
      >
        <Image
          source={require('../assets/images/applogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {showLoader && (
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 40 }} />
      )}
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
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff22',
  },
  logo: {
    width: 120,
    height: 120,
  },
});
