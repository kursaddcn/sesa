import {
    Button,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableOpacityComponent,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from "react";
import {manager} from "./BleManager";
import Colors from "../Config/Colors";
import Svg, {Ellipse} from "react-native-svg";
let trilateration = require('node-trilateration');
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/*Use like so*/


export default function Ble({navigation}) {
    /*
    const State = "PoweredOn";
    console.log(windowWidth);

    const [terminal_1_RSSI, setTerminal_1_RSSI] = useState(0);
    const [distanceToTerminal_1, setDistanceToTerminal_1] = useState(0);
    const [terminal_2_RSSI, setTerminal_2_RSSI] = useState(0);
    const [distanceToTerminal_2, setDistanceToTerminal_2] = useState(0);
    const [terminal_3_RSSI, setTerminal_3_RSSI] = useState(0);
    const [distanceToTerminal_3, setDistanceToTerminal_3] = useState(0);

    const [position, setPosition] = useState({x:0,y:0});

    useEffect(() => {

                manager.startDeviceScan(null, {allowDuplicates: true, scanMode: 2}, (error, device) => {
                    if (error) {
                        // Handle error (scanning will be stopped automatically)
                        console.log(error);
                        return
                    }

                    if (device.id.toString() === 'D1:F5:4C:FF:8B:4D') {
                        if (device.rssi !== null) {
                            let rssi = device.rssi;
                            setTerminal_1_RSSI(rssi);
                            let dist = (Math.pow(10, (-60 - rssi) / (10 * 4))).toString()
                            let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                            setDistanceToTerminal_1(distEdited);
                        }
                    }
                    if (device.id.toString() === 'C4:D0:23:C7:44:2B') {
                        if (device.rssi !== null) {
                            let rssi = device.rssi;
                            setTerminal_2_RSSI(rssi);
                            let dist = (Math.pow(10, (-60 - rssi) / (10 * 4))).toString()
                            let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                            setDistanceToTerminal_2(distEdited);

                        }
                    }
                    if (device.id.toString() === 'D2:5F:8E:82:C2:06') {
                        if (device.rssi !== null) {
                            let rssi = device.rssi;
                            setTerminal_3_RSSI(rssi);
                            let dist = (Math.pow(10, (-60 - rssi) / (10 * 4))).toString()
                            let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                            setDistanceToTerminal_3(distEdited);

                        }
                    }
                });
    }, [manager]);

    useEffect(  () => {

            let beacons = [
                {x: 0.1, y: 4.27, distance: parseFloat(distanceToTerminal_1.toString())},
                {x: 4.9, y: 3.32, distance: parseFloat(distanceToTerminal_2.toString())},
                {x: 2.5, y: 0.1, distance: parseFloat(distanceToTerminal_3.toString())}
            ];
            let posit = trilateration.calculate(beacons);
            if (parseFloat(posit.x.toString()) > 0 && parseFloat(posit.y.toString()) > 0) {
                setPosition({x: parseFloat(posit.x.toString()), y: parseFloat(posit.y.toString())});
            } else {
                console.log("- li değerler geldi.");
            }

    },[manager,distanceToTerminal_1,distanceToTerminal_2,distanceToTerminal_3])

    */
    return (
        <View style={styles.container}>
            {/*
                <Text style={{fontSize: 30}}>{"Distance T2:"}{distanceToTerminal_1}</Text>
                <Text style={{fontSize:30}}>{"Distance T4:"}{distanceToTerminal_2}</Text>
                <Text style={{fontSize:30}}>{"Distance T5:"}{distanceToTerminal_3}</Text>
                <Text style={{fontSize:30}}>{"POSITION:"}{parseFloat(parseFloat(position.x).toFixed(2))}{","}
            {parseFloat(parseFloat(position.y).toFixed(2))}</Text>
                <View style={styles.area}>
                <View style={{width:25,height:25,left:position.x*100,top:(3.1-position.y)*100,backgroundColor:"blue",border:1,borderRadius:100}}/>
                </View>
            */}
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
    area:{
        width:400,
        height:310,
        backgroundColor:"#adeea4"
    }


});
