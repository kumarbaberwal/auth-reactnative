import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Home() {
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                setUserEmail(email != null ? email : '');
                console.log(userEmail)
            } catch (error) {
                console.log("Error in Fetching data");
            }
        }
        fetchData();
    }, [])
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 25 }}>
                {userEmail}
            </ThemedText>
        </ThemedView>
    )
}