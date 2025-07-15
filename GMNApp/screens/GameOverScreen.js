import { View, Image, StyleSheet, Text } from 'react-native';
import Title from '../components/ui/Title';
import Colors
 from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/success.png')} />
      </View>
      <View>
         <Text style={styles.summaryText}>Your phone needed  
          <Text style={styles.highlight}> {roundsNumber} </Text> 
          rounds to guess the number{' '}
         <Text style={styles.highlight}>{userNumber}</Text>. 
         </Text>
         <PrimaryButton onPress={onStartNewGame}>
           Start New Game
         </PrimaryButton>
      </View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    fontFamily: 'open-sans-bold',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});