import { View, Text, StyleSheet } from "react-native";
import Input from "../../components/Input";

export default function Transfer(){
    return(
        <View style={styles.container}>
            <Input text={"Notes"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});