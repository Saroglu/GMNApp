import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { useState, useEffect, use } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import Title from '../components/ui//Title';
import NumberContainer from '../components/game/NumberContainer';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'; // Import any necessary icons if needed
import GuessLogItem from '../components/ui/GuessLogItem';

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
  const [rounds, setRounds] = useState([initialGuess]);

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
    setRounds((prevGuesses) => [newRndNumber, ...prevGuesses]);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(rounds.length);
      // This function should be passed as a prop to GameScreen
      Alert.alert('Congratulations!', 'You guessed the number!', [{ text: 'Yay!', style: 'cancel' }]);
    }
  }, [currentGuess, userNumber,]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const roundsNumber = rounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>Higher or lower?</InstructionText>
        <View style={styles.guessContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* <InstructionText>Previous Guesses</InstructionText>
        {rounds.map((guess, index) => (
          <NumberContainer key={index}>{guess}</NumberContainer>
        ))} */}
        <FlatList
          data={rounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={roundsNumber - itemData.index} guess={itemData.item} ></GuessLogItem>}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
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
  },
  InstructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});