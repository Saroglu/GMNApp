import { useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen'; // Assuming you will use this later
import Colors from './constants/colors'; 
import GameOverScreen from './screens/GameOverScreen'; // Assuming you will use this later

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // Reset game over state when a new number is picked
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;    
  }

  function gameOverHandler() {
    setGameIsOver(true);
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