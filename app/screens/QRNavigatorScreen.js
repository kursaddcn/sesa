import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import Colors from "../Config/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
const storeData = async (value) => {
    try{
        await AsyncStorage.setItem('modeQR',value)
    }
    catch (e){

    }
}
export default function QRNavigatorScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center',flex: 0.3}}>
                <TouchableOpacity style={styles.buttons} onPress={() => {
                    storeData("Product Detail");
                    navigation.navigate("QRScreen")}}>
                    <Text style={{color:"#FFF",fontSize:20}}>
                        Product Detail
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center',flex: 0.3}}>
                <TouchableOpacity style={styles.buttons} onPress={() => {
                    storeData("Advanced Scanner");
                    navigation.navigate("QRScreen")}}>
                    <Text style={{color:"#FFF",fontSize:20}}>
                        Advanced Scanner
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent:"center",
        alignItems:"center",
    },

    buttons:{
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        width:250,
        height:100,
        backgroundColor: Colors.standartColor,
        borderStyle:"solid",
        borderColor:"#F8F8F8",
        borderBottomWidth:2,
        borderWidth:1,

    },
});
