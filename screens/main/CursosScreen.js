import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { color, event, set } from 'react-native-reanimated';


const CursosScreen = ({ navigation, route }) => {

    const [mEvents, onChageEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);



    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;
        delay(2);

        fetch('http://192.168.1.6:3000/api/event/all', { signal: signal })
            .then((response) => response.json() )
            .then((json) => {
                console.log(json)
                onChageEvents(json)
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("successfully aborted");
                  } else {
                    alert(error)
                  }
                })
            .finally(() => {
                controller.abort();
                setLoading(false)
            });
    }, []);


    return (
        <View style={styles.container}>

            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>Cursos</Text>
                {isLoading ?
                    <ActivityIndicator
                        color={"#841584"}
                        style={styles.loader} /> : []}

                <FlatList
                    data={mEvents}
                    //keyExtractor={({ id }, index => id)}
                    renderItem={({ item }) =>
                    (<TouchableOpacity>
                        <View>
                            <Text>{item.descripcion}</Text>
                            <View style={styles.separator} />
                        </View>
                    </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}




function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}


const styles = StyleSheet.create({
    buttonPadding: {
        marginTop: 10,
        marginBottom: 10
    },
    loader: {
        height: 55,
        width: 55
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


export { CursosScreen }