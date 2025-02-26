import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://192.168.208.140:6000/auth/register', {
                email: email, password: password
            });

            if (response.status === 201) {
                const jsonValue = await JSON.stringify(response.data);
                await AsyncStorage.setItem('user', jsonValue);
                router.push('/home');
            }
        } catch (error) {
            Alert.alert('Singup Failed', 'Try Again');
            console.log(error);
        }
    };


    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.textInputContainer}>
                <TextInput placeholder="Enter Email" style={styles.textInput} onChangeText={setEmail} />
                <TextInput placeholder="Enter Password" style={styles.textInput} onChangeText={setPassword} />
            </ThemedView>
            <Pressable style={styles.button} onPress={handleRegister}>
                <ThemedText style={styles.buttonText}>
                    Register
                </ThemedText>
            </Pressable>
        </ThemedView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        gap: 50,
        // margin: 10,
    },
    textInput: {
        height: 50,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
    },
    textInputContainer: {
        gap: 20,
    },
    button: {
        backgroundColor: 'red',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
    buttonText: {
        // fontSize: ,
        fontWeight: 'bold',
        color: 'white'
    }
});