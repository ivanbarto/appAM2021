import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';


const RegisterScreen = ({ navigation, route }) => {
    const [username, onChangeUsername] = React.useState("username");
    const [password, onChangePassword] = React.useState("Password");

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>CursApp</Text>
                <Text>Registro</Text>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
            />

            <Button
                title="REGISTRARSE"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() =>
                    navigation.navigate('RegisterScreen', { name: 'Jane' })
                }
            />
        </View>
    );
};








const LoginScreen = ({ navigation, route }) => {
    const [username, onChangeUsername] = React.useState("username");
    const [password, onChangePassword] = React.useState("Password");

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>CursApp</Text>
                <Text>Login</Text>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
            />
            <Button
                style={styles.buttonPadding}
                title="ENTRAR"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() =>
                    navigation.navigate('CursosScreen', { name: 'Jane' })
                }
            />
            <View style={styles.separator} />
            <Button
                style={styles.buttonPadding}
                title="REGISTRARSE"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() =>
                    navigation.navigate('RegisterScreen', { name: 'Jane' })
                }
            />
        </View>
    );
};



// const login = (email, password) => {
//     return fetch('https://reactnative.dev/movies.json'), {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             firstParam: 'yourValue',
//             secondParam: 'yourOtherValue'
//         })
//     }
//         .then((response) => response.json())
//         .then((json) => {
//             return json.movies;
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };




const styles = StyleSheet.create({
    buttonPadding: {
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export { LoginScreen, RegisterScreen, styles }