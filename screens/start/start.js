import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';


const RegisterScreen = ({ navigation, route }) => {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [name, onChangeName] = React.useState("");
    const [lastname, onChangeLastname] = React.useState("");
    const [phone, onChangePhone] = React.useState("");
    const [isLoading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>CursApp</Text>
                <Text>Registrate en la plataforma</Text>
            </View>
            <View style={styles.blankSpace} />

           
            <View>
                <Text>Nombre</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                />
            </View>
            <View>
                <Text>Apellido</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLastname}
                    value={lastname}
                />
            </View>
            <View>
                <Text>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePhone}
                    value={phone}
                />
            </View>
            <View>
                <Text>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                />
            </View>
            <View>
                <Text>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    value={password}
                />
            </View>

            {isLoading ?
                <ActivityIndicator
                    color={"#841584"}
                    style={styles.loader} /> : []}

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
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [isLoading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>CursApp</Text>
                <Text>Encuentra los cursos que necesitas en un solo lugar</Text>
            </View>
            <View style={styles.blankSpace} />
            <View>
                <Text>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                />
            </View>

            <View>
                <Text>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    value={password}
                />
            </View>

            {isLoading ?
                <ActivityIndicator
                    color={"#841584"}
                    style={styles.loader} /> : []}

            <Button
                style={styles.buttonPadding}
                title="ENTRAR"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => {
                    setLoading(true)
                    onLogin(username, password, navigation, setLoading);
                }

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


const onLogin = (email, password, navigation, setLoading) => {
    const controller = new AbortController();

    var success = false;
    var message = "";
    const signal = controller.signal;

    const details = {
        email: email,
        password: password,
    };

    const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    fetch('http://192.168.1.14:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }, { signal: signal })

        .then((response) => response.json())
        .then((json) => {
            console.log(json["mensaje"])
            success = json["success"]
            message = json["mensaje"]
        })
        .catch((error) => {
            isLoading = false
            if (error.name === "AbortError") {
                console.log("successfully aborted");
            } else {
                alert(error)
            }
        })
        .finally(() => {
            controller.abort();
            setLoading(false)
            if (success == true) {
                navigation.navigate('CursosScreen', { name: 'Jane' })
            } else {
                alert(message)
            }
        });

}



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
    blankSpace: {
        marginVertical: 30,
    },
});

export { LoginScreen, RegisterScreen, styles }