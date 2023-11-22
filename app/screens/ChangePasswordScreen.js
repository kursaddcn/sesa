import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput, Alert,
} from 'react-native';
import Fonts from "../Config/Fonts";
import Colors from "../Config/Colors";
import React, {useEffect, useState} from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createNewUser from "../actions/userLoginAction";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const validator = require('validator');

const api = axios.create({
    baseURL: BaseUrl.baseURL
})

export default function ChangePasswordScreen({navigation}) {


    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage,setErrorMessage]= useState("");

    useEffect(async () => {
        const value = await AsyncStorage.getItem('email');
        setEmail(value);
    }, [passwordController]);


    function passwordController(){
        displayFormatError();
        if(errorMessage===""){
            api.post("/changePassword",{userMail:email,userPassword:currentPassword,newPassword:newPassword})
                .then(res =>{
                    if(res.data.statCode === 1){
                        setErrorMessage("Current password is incorrect\n")
                    }
                    else if(res.data.statCode === 2){
                        Alert.alert("Password is changed.")
                    }
                })
        }
        // 1) Kullanıcının Mail Adresi İle Şifresi Uyumu Kontrolu
        // 2) Yeni Şifrenin Veritabanına Yazılımı

    }

    function displayFormatError(){

        let errors = [];
        let errorMessage="";
        if(newPassword.length < 6 || newPassword.length > 30){
            errors.push("New Password must be between 6-30.");
        }
        if(currentPassword.length < 6 || currentPassword.length > 30){
            errors.push("Current Password must be between 6-30.");
        }

        for (let i = 0; i < errors.length ; i++) {
            if(i<errors.length-1){
                errorMessage += errors[i].toString() + "\n";
            }
            else{
                errorMessage += errors[i].toString();
            }
        }
        setErrorMessage(errorMessage);
    }


    return (
        <View style={styles.container}>

            <View>
                {errorMessage !== ""
                    ? <Text style={styles.errorFieldStyle}>{errorMessage}</Text>
                    : <Text/>
                }
            </View>

            {/*PASSWORDS*/}
            <View style={styles.inputView}>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Current Password*"
                        maxLength={30}
                        minLength={8}
                        placeholderTextColor="grey"
                        onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                    />
                </View>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="New Password*"
                        maxLength={30}
                        minLength={8}
                        placeholderTextColor="grey"
                        onChangeText={(newPassword) => setNewPassword(newPassword)}
                    />
                </View>
                {/* PASSWORD SECTION*/}

            </View>
            {/* SEND MAIL SECTION*/}

            <TouchableOpacity style={styles.lgn_button}
                              onPress={() => {
                                  passwordController()
                              }}>

                <Text style={{color:"#FFF"}}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        marginBottom: 20,
        justifyContent:"center",
        alignItems: "center",
    },
    inputFieldsContainers:{
        width:300,
        height:50,
        padding:2,
        backgroundColor: "#F6F6F6",
        borderStyle:"solid",
        borderColor:"#F8F8F8",
        borderBottomWidth:2,
        borderWidth:1,
        borderRadius: 8,
        marginTop:20,
    },
    TextInput: {
        paddingLeft:10,
        flex:1,
        height: 50,
    },
    lgn_button:{
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        width:300,
        height:50,
        backgroundColor: Colors.standartColor,
        borderStyle:"solid",
        borderColor:"#F8F8F8",
        borderBottomWidth:2,
        borderWidth:1,

    },
    errorFieldStyle:{
        marginTop:10,
        backgroundColor:"rgba(248,0,0,0.27)",
        borderRadius:10,
        padding:10,
        marginBottom:10,
    }


});
