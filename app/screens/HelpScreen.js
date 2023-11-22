import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Pressable, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import Fonts from "../Config/Fonts";

export default function HelpScreen({navigation}) {
    return(
        <View style={styles.container}>
            {/* LOGO SECTION*/}
            <Image  source={require("../assets/Logo.png")} style={styles.logo}/>
            <View>
                <Text style={styles.textBox}>
                    ▪ After registering and logging into our application, you can click on the categories on the main page to add the products in that category to the shopping list or create a direct route.
                </Text>
                <Text style={styles.textBox}>
                    ▪ You can search for products by going to the Search section and add this product to the shopping list and create a route.
                </Text>
                <Text style={styles.textBox}>
                    ▪ With the QR code scanning screen, you can access the information of the products and make a smart comparison.
                </Text>
                <Text style={styles.textBox}>
                    ▪ You can instantly check your shopping list and shopping cart.
                </Text>
                <Text style={styles.textBox}>
                    ▪ You can view and update your profile and access your filters.
                </Text>
            </View>


        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:50,
    },
    logo:{
        flex:0.2,
        width:200,
        height:50,
        resizeMode:"contain",
        marginBottom: 40,
    },
    textBox:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:10,
    },


});
