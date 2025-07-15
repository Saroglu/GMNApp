import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

function InstructionText({ children, style }) {
    return (
        <Text style={[styles.instructionText, style]}>
            {children}
        </Text>
    );
}

export default InstructionText;

export const styles = StyleSheet.create({
    instructionText: {
        fontSize: 24,
        color: Colors.accent500,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 8,
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        fontFamily: 'open-sans', 
    },
});