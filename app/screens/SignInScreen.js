import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    ScrollView,
    KeyboardAvoidingViewComponent, Keyboard
} from 'react-native';
import Fonts from "../Config/Fonts";
import Colors from "../Config/Colors";
import React, {useEffect, useState} from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const validator = require('validator');
import BaseUrl from "../Config/BaseUrl";

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('email', value)
    } catch (e) {
        // saving error
    }
}
let user_object = {
    name: '',
    surname:'',
    email: '',
};
const storeUserData = async (userData)  =>{
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData))
    } catch (e) {
        // saving error
    }
}
const mapStateToProps = (state) => {
    return {
        userStatus: state.userLoginReducer.userMail,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setMail: (userData) => {
            dispatch((userData));
        }
    }
};
const api = axios.create({
    baseURL: BaseUrl.baseURL
})


export default function SignInScreen({navigation}) {
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

    console.log(BaseUrl.baseURL);
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(1);
    const [data, setData] = useState({
        password: '',
        isSecureTextEntry: true,
    });
    const [errorMessage,setErrorMessage]= useState("");
    const [authError,setAuthError] = useState(false);

    useEffect(() => {
        api.post("/login",{userMail:email,userPassword:data.password})
            .then(res => {
                console.log(res.data);
                user_object.name = res.data.onlineUser.userName;
                user_object.surname = res.data.onlineUser.userSurname;
                user_object.email = res.data.onlineUser.userMail;
                setUserType(res.data.onlineUser.userType);
                storeUserData(user_object);
                setAuthError(!res.data.stat);
            })
    }, [passController]);

    const formDataValidation ={
        emailError:true,
        passwordDataError:true,
    };

    function validateFormData() {
        formDataValidation.emailError = !validator.isEmail(email);
        formDataValidation.passwordDataError = data.password.length < 6 || data.password.length > 30;
    }

    function displayFormatError(){
        let errors = [];
        let errorMessage="";
        if(formDataValidation.emailError){
            errors.push("Email format is wrong.");
        }
        if(formDataValidation.passwordDataError){
            errors.push("Password must be between 6-30.");
        }
        if(authError){
            errors.push("Email or password is wrong.");
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
    function passController(){
        validateFormData();
        if (formDataValidation.emailError || formDataValidation.passwordDataError || authError ){
            displayFormatError();
        }else{
            storeData(email.toString());
            if(userType===1){
                navigation.navigate('AppTabsScreen');
            }
            else if(userType===2){
                navigation.navigate('AppTabsForEmployeeScreen');
            }


        }
    }



    return (
            <View style={styles.container}>

            {/* LOGO SECTION*/}

                    {
                        isKeyboardVisible===false
                        ?
                        <Image  source={require("../assets/Logo.png")} style={styles.logo}/>
                        :
                        <Image  source={require("../assets/small-logo.png")} style={styles.slogo}/>
                    }


            {/* LOGIN TITLE*/}
            <Text style = {styles.font}> Log In</Text>

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
                <View style={styles.inputFieldsContainers}>
                <View style={{flex:1,flexDirection: "row"}}>
                <View style={{flex:9}}>
                <TextInput
                     style={styles.TextInput}
                     placeholder="Password"
                     placeholderTextColor="grey"
                     maxLength={14}
                     minLength={4}
                     secureTextEntry={data.isSecureTextEntry}
                     onChangeText={data => {
                         setData({
                             password: data,
                             isSecureTextEntry: !data.isSecureTextEntry,
                         });
                     }}/>
                </View>
                    {/* SHOW/HIDE PASSWORD TOGGLE SECTION*/}
                    <View style={{flex:1,justifyContent:"center"}}>
                     <TouchableOpacity
                     onPress={() => {
                     setData({
                     ...data,
                     isSecureTextEntry: !data.isSecureTextEntry,
                        });
                     }}>
                         <FontAwesome
                             name={data.isSecureTextEntry ? 'eye-slash' : 'eye'}
                             color="#5DB075"
                             size={25}
                         />

                     </TouchableOpacity>
                    </View>

                </View>
            </View>
            </View>
            {/* FORGOT PASSWORD SECTION SECTION*/}

            <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
                <Text style={styles.forgot_button}>Forgot Your Password?</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.lgn_button}
                onPress={() => {passController()}}
            >
                <Text style={{color:"#FFF"}}>
                    Log In
                </Text>
            </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:"center",alignItems:"center",marginTop:20}}
                                  onPress={() => navigation.navigate('SignUpNavigatorScreen')}
                >
                    <Text style={{color:Colors.standartColor,
                        fontWeight:"bold"}}>
                        Don’t have an account? Sign up
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
    slogo:{
        flex:0.6,
        width:500,
        height:500,
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
