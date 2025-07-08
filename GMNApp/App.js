import { StyleSheet, View } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {
  return (
    // <View style={styles.container}>
    <LinearGradient style={styles.container} colors={['#4e0329', '#ddb52f']}>
      <StartGameScreen />
    </LinearGradient>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddb52f',
  },
});