import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, TextInput } from "react-native";
import axios from 'axios';

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    interface User {
        email: string,
        token: string,
        _id: string,
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post<{ user: User }>('http://192.168.208.140:6000/auth/login', {
                email: email, password: password
            });
            console.log(response.data);

            if (response.status === 200) {
                const jsonValue = await JSON.stringify(response.data);
                const user = response.data;
                const email = user.user.email;
                await AsyncStorage.setItem('userEmail', email);
                router.push('/home');
            }
        } catch (error) {
            Alert.alert('Login Failed', 'Try Again');
            console.log(error);
        }
    };


    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.textInputContainer}>
                <TextInput placeholder="Enter Email" style={styles.textInput} onChangeText={setEmail} />
                <TextInput placeholder="Enter Password" style={styles.textInput} onChangeText={setPassword} />
            </ThemedView>
            <Pressable style={styles.button} onPress={handleLogin}>
                <ThemedText style={styles.buttonText}>
                    Login
                </ThemedText>
            </Pressable>
            <ThemedView style={{ justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', gap: 10, }}>
                <ThemedText>
                    Didn't Signup?
                </ThemedText>
                <Pressable style={{}} onPress={() => {
                    router.push('/signup');
                }}>
                    <ThemedText style={[styles.buttonText, { color: 'blue' }]}>
                        Signup
                    </ThemedText>
                </Pressable>
            </ThemedView>
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
