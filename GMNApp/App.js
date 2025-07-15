import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen'; // Assuming you will use this later
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen'; // Assuming you will use this later
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Splash screen'in otomatik gizlenmesini engelle
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  // Font yükleme - hata ayıklama için basitleştirilmiş
  const [fontsLoaded, fontError] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function hideSplash() {
      try {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn('SplashScreen hide error:', error);
      }
    }
    hideSplash();
  }, [fontsLoaded, fontError]);

  // Font yükleme beklemesi
  if (!fontsLoaded && !fontError) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // Reset game over state when a new number is picked
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen
      userNumber={userNumber}
      roundsNumber={roundsNumber}
      onStartNewGame={startNewGameHandler} />;
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setRoundsNumber(numberOfRounds); // Set the number of rounds when the game is over
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setRoundsNumber(0); // Reset rounds number when starting a new game
  }

  return (
    // <View style={styles.container}>
    <LinearGradient style={styles.container} colors={[Colors.primary700, Colors.accent500]}>
      <ImageBackground source={require('./assets/bg.jpg')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={{ flex: 1 }}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ddb52f',
  },
  backgroundImage: {
    opacity: 0.2,
  }
});