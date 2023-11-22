import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text,TouchableOpacity, View} from 'react-native';
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../Config/Colors";

export default function SignUpNavigatorScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Image  source={require("../assets/Logo.png")} style={styles.logo}/>
            <View style={styles.title}>
                <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
                <View style={styles.backIcon}>
                    <TouchableOpacity
                        onPress={ () => navigation.navigate('SignInScreen')}>
                    <FontAwesome
                    name={'reply'}
                    color="black"
                    size={35}
                    />
                    </TouchableOpacity>
                </View>
            <Text style = {styles.titleText}>Sign Up As</Text>
            </View>
            </View>
            <View style={{marginTop: 50}}>


            <TouchableOpacity style={styles.buttons}
                              onPress={() => navigation.navigate('SignUpCustomerScreen')}
            >
                <Text style={{color:"#FFF",fontSize: 25,fontWeight: "bold"}}>
                    Customer
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}
                              onPress={() => navigation.navigate('SignUpEmployeeScreen')}
            >
                <Text style={{color:"#FFF",fontSize: 25,fontWeight: "bold"}}>
                    Employee
                </Text>
            </TouchableOpacity>
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
        alignContent:"flex-start",
        justifyContent: 'flex-start',
        paddingTop:50,
    },
    logo:{
        flex:0.2,
        width:300,
        height:100,
        resizeMode:"contain",

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
        marginLeft:50,
      justifyContent:"flex-start",
      alignItems:"flex-start",
      alignContent:"flex-start",
    },
    titleText:{
        flex:0.8,
        flexDirection:"column",
        justifyContent:"flex-start",
        fontSize:30,
        fontWeight:"bold",

    },
    buttons:{
        borderRadius:100,
        marginTop:20,
        alignContent:"flex-start",
        justifyContent:"center",
        alignItems:"center",
        width:330,
        height:80,
        backgroundColor: Colors.standartColor,
        borderStyle:"solid",
        borderColor:"#F8F8F8",
        borderBottomWidth:2,
        borderWidth:1,

    }

});
