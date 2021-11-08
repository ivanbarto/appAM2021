import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';



const CursosScreen = ({ navigation, route }) => {

    const [mEvents, onChageEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        fetch('http://192.168.1.14:3000/api/event/all', { signal: signal })
            .then((response) => response.json())
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
                <Text style={styles.title}>Eventos</Text>
                <View style={styles.blankSpace} />

                {isLoading ?
                    <ActivityIndicator
                        color={"#841584"}
                        style={styles.loader} /> : []}

                <FlatList
                    data={mEvents}
                    //keyExtractor={({ id }, index => id)}
                    renderItem={({ item }) =>
                    (<TouchableOpacity onPress={() => {
                        setLoading(true)
                        onPressEvent(item.id, navigation,setLoading);
                    }
                    }>
                        <View>
                            <Text style={styles.subtitle} >Inicio: {item.fecha_inicio}</Text>
                            <Text>Ubicación: {item.lugar}</Text>
                            <Text style={styles.eventDescription}>{item.descripcion}</Text>
                            <View style={styles.separator} />
                        </View>
                    </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const onPressEvent = (eventId, navigation,setLoading) => {

    var courses = []
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('http://192.168.1.14:3000/api/course/getByEventId/' + eventId, {
        method: 'GET'
    }, { signal: signal })

        .then((response) => response.json())
        .then((json) => {
            courses = json
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
            navigation.navigate('EventosSceen', { cursos: courses })
        });
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
    blankSpace: {
        marginVertical: 30,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    eventDescription: {
        marginTop: 10,
        fontWeight: '900',
        fontSize: 13
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