import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmployeeProfileScreen({navigation}){
    let user_object = {
        name: '',
        surname:'',
        email: '',
    };
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(async () => {
        user_object = JSON.parse(await AsyncStorage.getItem('userData'));
        setName(user_object.name);
        setSurname(user_object.surname);
        setEmail(user_object.email);
        console.log(user_object.name);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatarImg}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop:25,
                            marginBottom: 5,
                        }]}>{name} {surname}</Title>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>

                <View style={styles.row}>
                    <Icon name="email-outline" color="#5db075" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>

            </View>




        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    avatarImg:{
        backgroundColor: '#fff',
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    infoBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});

