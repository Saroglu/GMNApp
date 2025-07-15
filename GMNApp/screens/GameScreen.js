import { View, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import Title from '../components/ui//Title';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';

function generateRandomBetween(min, max, exclude) {

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {

    if ((direction === 'lower' && currentGuess < userNumber) ||
        (direction === 'greater' && currentGuess > userNumber)) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    } 

   if (direction === 'lower') {
      maxBoundary = currentGuess;
   }
   else if (direction === 'greater') {
      minBoundary = currentGuess + 1;
    }
    
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
     setCurrentGuess(newRndNumber);
  }

  useEffect(() => { 
    if (currentGuess === userNumber) {
      onGameOver();
      // This function should be passed as a prop to GameScreen
      Alert.alert('Congratulations!', 'You guessed the number!', [{ text: 'Yay!', style: 'cancel' }]);
    }
  }, [currentGuess, userNumber,]);
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or lower?</InstructionText>
        <View style={styles.guessContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </Card>
      {/* <View>LOG AROUNDS</View> */}
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  guessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});