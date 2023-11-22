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

export default function ResetPasswordScreen({navigation}) {

   function showSuccessAlert() {
       Alert.alert(
            'Your Password Reset',
            'Your New Password Send To ' + email,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {navigation.navigate('SignInScreen')
                }},
            ]
        );
    }

    const [email, setEmail] = useState('');
    const [errorMessage,setErrorMessage]= useState("");
    const [emailFormatError,setEmailFormatError]= useState(false);
    const [emailNotExistsError,setEmailNotExistsError]= useState(false);

    useEffect(async () => {
        api.post("/getUserByMail",{userMail:email})
            .then(res => {
                setEmailNotExistsError(res.data.code !== 1)
            })
        setEmailFormatError(!validator.isEmail(email));

    }, [emailController]);

    function emailController(){

        if (emailFormatError === false && emailNotExistsError ===false){
            api.put("/updatePassword",{userMail:email})
            showSuccessAlert();
        }
        else{
            displayFormatError();

        }
    }

    function displayFormatError(){

        let errors = [];
        let errorMessage="";

        if(emailFormatError===true){
            errors.push("E-mail format is wrong.");
        }
        if(emailNotExistsError===true){
            errors.push("E-mail not found.");
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
            {/* LOGO SECTION*/}
            <Image  source={require("../assets/Logo.png")} style={styles.logo}/>
            {/* LOGIN TITLE*/}
            <Text style = {styles.font}> Reset Password</Text>

            <View>
                {errorMessage !== ""
                    ? <Text style={styles.errorFieldStyle}>{errorMessage}</Text>
                    : <Text/>
                }
            </View>

            {/* USER MAIL AND PASSWORDS*/}
            <View style={styles.inputView}>
                <View style={styles.inputFieldsContainers}>
                    {/* MAIL SECTION*/}
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        maxLength={30}
                        minLength={8}
                        placeholderTextColor="grey"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                {/* PASSWORD SECTION*/}

            </View>
            {/* SEND MAIL SECTION*/}

            <TouchableOpacity style={styles.lgn_button}
                              onPress={() => {
                                  emailController()
                              }}>

                <Text style={{color:"#FFF"}}>
                    Send Reset E-Mail
                </Text>
            </TouchableOpacity>
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
        width:300,
        height:100,
        resizeMode:"contain",
        marginBottom: 40,
    },
    font:{
        fontFamily:Fonts.fontFamily,
        fontSize:30,
        fontWeight:"bold",
        color:"#232121",
        paddingBottom:10,
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
    },
    TextInput: {
        paddingLeft:10,
        flex:1,
        height: 50,
    },
    forgot_button: {
        color:Colors.standartColor,
        fontSize:13,
        marginBottom: 30,
        fontWeight:"bold",
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
