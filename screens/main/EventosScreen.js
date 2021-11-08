import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';




const EventosScreen = ({ navigation, route }) => {
    const [mCourses, onChangeCourses] = useState([]);


    useEffect(() => {
        const cursos = route.params.cursos;
        console.log(cursos)
        onChangeCourses(cursos);
    }, []);

    return (
        <View style={styles.container}>

            <StatusBar style="auto" />

            <View style={styles.centeredContainer} >
                <Text style={styles.title}>Cursos</Text>
                <View style={styles.blankSpace} />

                <FlatList
                    data={mCourses}
                    //keyExtractor={({ id }, index => id)}
                    renderItem={({ item }) =>
                    (
                        <View>
                            <Text style={styles.subtitle} >{item.nombre}</Text>
                            <Text style={styles.eventDescription} >{item.descripcion}</Text>
                            <View style={styles.separator} />
                        </View>
                    )}
                />

            </View>
        </View>
    );
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
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    eventDescription: {
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
    blankSpace: {
        marginVertical: 30,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});


export { EventosScreen }