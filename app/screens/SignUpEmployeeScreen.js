import {
    Image, Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableOpacityComponent,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Checkbox from 'expo-checkbox';
import Colors from "../Config/Colors";
import {connect} from "react-redux";
import createNewUser from "../actions/userLoginAction";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const validator = require('validator');

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('email', value)
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
            dispatch(createNewUser(userData));
        }
    }
};
const api = axios.create({
    baseURL: BaseUrl.baseURL
})
function addNewUser(data){

    return api.post('/addNewUser',
        {
            userName:data.userName,
            userSurname:data.userSurname,
            userMail:data.userMail,
            userPassword:data.userPassword,
            userType: data.userType,
            userMarketCode:data.userMarketCode,
        });


}

export default function SignUpEmployeeScreen({navigation}) {


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

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [passwordData, setPasswordData] = useState({
        password: '',
        isSecureTextEntry: true,
    });
    let [emailExistsError,setEmailExistsError] = useState(true);
    const [marketCode, setMarketCode] = useState(0);
    const [errorMessage,setErrorMessage]= useState("");


    useEffect(() => {
        api.post("/getUserByMail",{userMail:email})
            .then(res => {
                setEmailExistsError(res.data.stat);
            })
    }, [passController]);


    const formDataValidation ={
        nameError:true,
        surnameError:true,
        emailError:true,
        passwordDataError:true,
        marketCodeDataError:true,
    };

    function validateFormData() {
        formDataValidation.nameError = name.toString().length < 4 || name.toString().length > 30;
        formDataValidation.surnameError = surname.length < 4 || surname.length > 30;
        formDataValidation.emailError = !validator.isEmail(email);
        formDataValidation.passwordDataError = passwordData.password.length < 6 || passwordData.password.length > 30;
        formDataValidation.marketCodeDataError = marketCode.toString().length !== 5;
    }

    function displayFormatError(){
        let errors = [];
        let errorMessage="";

        if(formDataValidation.nameError){
            errors.push("Name must be between 5-30.");
        }
        if(formDataValidation.surnameError ){
            errors.push("Surname must be between 5-30.");
        }
        if(formDataValidation.emailError){
            errors.push("Email format is wrong.");
        }
        if(formDataValidation.passwordDataError){
            errors.push("Password must be between 6-30.");
        }
        if(emailExistsError===true){
            errors.push("Email address is in use.");
        }
        if(formDataValidation.marketCodeDataError===true){
            errors.push("Market Code must be 5 characters.");
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
        validateFormData()
        if (formDataValidation.nameError || formDataValidation.surnameError || formDataValidation.marketCodeDataError ||
            formDataValidation.emailError || formDataValidation.passwordDataError || emailExistsError===true){
            displayFormatError();
        }else{
            addNewUser({
                userName: name,
                userSurname: surname,
                userMail: email,
                userPassword: passwordData.password,
                userType: 2,
                userMarketCode : marketCode,
            })
            storeData(email.toString());
            navigation.navigate('SignUpVerificationScreen');
        }
    }


    const [isSelected, setSelection] = useState(false);

    return (
        <View style={styles.container}>
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
                    <Text style = {styles.titleText}>Employee Sign Up</Text>
                </View>
            </View>
            {/*INPUT FIELDS*/}

            <View>
                {errorMessage !== ""
                    ? <Text style={styles.errorFieldStyle}>{errorMessage}</Text>
                    : <Text/>
                }
            </View>
            <View style={{marginTop:10}}>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Name"
                        maxLength={30}
                        minLength={3}
                        placeholderTextColor="grey"
                        onChangeText={(name) => setName(name)}
                    />
                </View>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Surname"
                        maxLength={30}
                        minLength={3}
                        placeholderTextColor="grey"
                        onChangeText={(surname) => setSurname(surname)}
                    />
                </View>
                <View style={styles.inputFieldsContainers}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        maxLength={30}
                        minLength={8}
                        placeholderTextColor="grey"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputFieldsContainers}>
                    <View style={{flex:1,flexDirection: "row"}}>
                        <View style={{flex:9}}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                maxLength={14}
                                minLength={4}
                                placeholderTextColor="grey"
                                secureTextEntry={passwordData.isSecureTextEntry}
                                onChangeText={data => {
                                    setPasswordData({
                                        password: data,
                                        isSecureTextEntry: passwordData.isSecureTextEntry,
                                    });
                                }}/>
                        </View>
                        {/* SHOW/HIDE PASSWORD TOGGLE SECTION*/}
                        <View style={{flex:1,justifyContent:"center"}}>
                            <TouchableOpacity
                                onPress={() => {
                                    setPasswordData({
                                        ...passwordData,
                                        isSecureTextEntry: !passwordData.isSecureTextEntry,
                                    });
                                }}>
                                <FontAwesome
                                    name={passwordData.isSecureTextEntry ? 'eye-slash' : 'eye'}
                                    color="#5DB075"
                                    size={25}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
            <View style={styles.inputFieldsContainers}>
                <TextInput keyboardType={Platform.OS.toString() === "android" ? "numeric" : "number-pad"}
                    style={styles.TextInput}
                    placeholder="Market Code"
                    maxLength={30}
                    minLength={8}
                    placeholderTextColor="grey"
                    onChangeText={(marketCode) => setMarketCode(marketCode)}
                />
            </View>

            <View style={styles.checkboxContainer}>

                <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}

                />
                <TouchableOpacity
                    onPress={() =>
                        setSelection(!isSelected)}>

                    <Text style={{flexWrap: 'wrap',fontSize: 13,marginLeft: 5}}>I would like to receive your newsletter and other promotional information.</Text>
                </TouchableOpacity>

            </View>

            {/*REGISTER BUTTON*/}
            <TouchableOpacity onPress={()=> { passController()}}
                              style={styles.button}>
                <Text
                    style={{color:"#FFF"}}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen') }
            >
                <Text style={styles.lgn_button}>Already a member? Log in</Text>
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
        marginTop: 30,
    },
    slogo:{
        width:80,
        height:120,
        resizeMode:"contain",
        marginTop: 5,
        paddingTop: 5,
    },
    title:{
        marginTop:50,
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
        marginTop:15,
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
    lgn_button: {
        color:Colors.standartColor,
        fontSize:13,
        marginBottom: 30,
        fontWeight:"bold",
    },
    errorFieldStyle:{
        marginTop:10,
        backgroundColor:"rgba(248,0,0,0.27)",
        borderRadius:10,
        padding:10,
    }

});
connect(mapStateToProps, mapDispatchToProps)(SignUpEmployeeScreen)
