import { StatusBar } from 'expo-status-bar';
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableOpacityComponent,
    View
} from 'react-native';
import React, {useEffect, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Checkbox from 'expo-checkbox';
import Colors from "../Config/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";

const api = axios.create({
    baseURL: BaseUrl.baseURL
})

export default function SignUpVerificationScreen({navigation}) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeDB, setVerificationCodeDB] = useState('');
    const [verificationError, setVerificationError] = useState(true);
    const [verificationErrorMessage, setVerificationErrorMessage] = useState("");

    useEffect(async () => {
        const value = await AsyncStorage.getItem('email');
        setEmail(value);
        api.post("/getUserByMail",{userMail:email})
            .then(res => {
                setVerificationCodeDB(res.data.verificationCode);
            })

    }, [verificationController]);

    function verificationController(){

        if (verificationCode===verificationCodeDB){
            setVerificationError(false);
            navigation.navigate('SignInScreen');
        }
        else{
            setVerificationError(true);
            displayFormatError();

        }
    }
    function displayFormatError(){
        setVerificationErrorMessage("Wrong code entered.")
    }

    return (
        <View style={styles.container}>
            {
                isKeyboardVisible===false
                    ?
                    <Image  source={require("../assets/Logo.png")} style={styles.logo}/>
                    :
                    <Image  source={require("../assets/small-logo.png")} style={styles.slogo}/>
            }
            <View style={styles.title}>
                <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            onPress={ () => navigation.navigate('SignUpNavigatorScreen')}>
                            <FontAwesome
                                name={'reply'}
                                color="black"
                                size={35}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleText}>Mail Verification</Text>
                </View>
            </View>
            {/*INPUT FIELDS*/}
            <View style={{marginTop: 40,alignItems:"center"}}>
                <View>
                    <Text style={styles.info_text}>We've sent a verification code to your email- {email}</Text>
                </View>
                <View>
                    {verificationErrorMessage !== ""
                        ? <Text style={styles.errorFieldStyle}>{verificationErrorMessage}</Text>
                        : <Text/>
                    }
                </View>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Enter verification code"
                        placeholderTextColor="grey"
                        onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
                    />
                </View>

            </View>

            <TouchableOpacity
                              onPress={() => {
                                  api.post("/resendVerificationCode",{userMail:email})
                                  &&
                                  alert("we send code again")
                              }}
            >
                <Text style={styles.info_text}>
                    Resend Code
                </Text>
            </TouchableOpacity>
            {/*REGISTER BUTTON*/}
            <TouchableOpacity style={styles.button}
                              onPress={()=>{
                                  verificationController();
                              }}
            >
                <Text style={{color:"#FFF",fontSize:20,fontWeight:"bold"}}>
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
        flexDirection:'column',
        alignItems: 'center',
        alignContent:"flex-start",
        justifyContent: 'flex-start',
    },
    logo:{
        width:300,
        height:200,
        resizeMode:"contain",
    },
    slogo:{
        width:80,
        height:120,
        resizeMode:"contain",
        marginTop: 10,
        paddingTop: 10,
    },
    title:{
        marginTop:20,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    backIcon:{
        flex:0.2,
        flexDirection:"column",
        marginLeft:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        alignContent:"flex-start",
    },
    titleText:{
        flex:0.9,
        flexDirection:"column",
        justifyContent:"flex-start",
        fontSize:30,
        fontWeight:"bold",

    },
    inputFieldsContainers:{
        marginBottom:15,
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
        fontSize:15,
    },
    checkboxContainer: {
        marginLeft:50,
        marginRight:10,
        paddingRight:20,
        padding:10,
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        width:15,
        height:15,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        alignSelf: "flex-start",
    },
    button:{
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
    info_text: {
        color:Colors.standartColor,
        fontSize:18,
        marginBottom: 20,
        fontWeight:"bold",
        flexWrap: 'wrap',
        marginLeft: 5,
        textAlign:"center",
    },
    errorFieldStyle:{
        marginTop:10,
        backgroundColor:"rgba(248,0,0,0.27)",
        borderRadius:10,
        padding:10,
        marginBottom: 10,
    }

});
