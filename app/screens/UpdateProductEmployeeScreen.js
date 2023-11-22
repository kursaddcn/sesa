import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import Fonts from "../Config/Fonts";
import {reloadAsync} from "expo-updates";

//Item array for the dropdown
let items = [];
let locationItems = [];
for (let i = 1; i <=200 ; i++) {
    const currElement={ id: i, name: i.toString()};
    items.push(currElement);
}
for (let i = 2; i <=25 ; i++) {
    const currElement={ id: i, name: i.toString()};
    locationItems.push(currElement);
}
export default function UpdateProductEmployeeScreen({navigation}) {
    const [selectedItems, setSelectedItems] = useState();
    const [selectedLocationItems, setSelectedLocationItems] = useState();
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                Product ID
            </Text>
            <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                //On text change listner on the searchable input
                selectedItems={selectedItems}
                onItemSelect={(item) => (setSelectedItems(item))}
                //onItemSelect called after the selection from the dropdown
                containerStyle={{ padding: 5 }}
                //suggestion container style
                textInputStyle={{
                    //inserted text style
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#FAF9F8',
                    borderColor: '#bbb',
                    borderWidth: 1,
                }}
                itemTextStyle={{
                    //text style of a single dropdown item
                    color: '#222',
                }}
                itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: '60%',
                }}
                items={items}
                //mapping of item array
                //default selected item index
                placeholder="Choose Product ID"
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
            />
            <Text style={styles.headingText}>
                Location ID
            </Text>
            <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                //On text change listner on the searchable input
                selectedItems={selectedLocationItems}
                onItemSelect={(item) => (setSelectedLocationItems(item))}
                //onItemSelect called after the selection from the dropdown
                containerStyle={{ padding: 5 }}
                //suggestion container style
                textInputStyle={{
                    //inserted text style
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#FAF9F8',
                    borderColor: '#bbb',
                    borderWidth: 1,
                }}
                itemTextStyle={{
                    //text style of a single dropdown item
                    color: '#222',
                }}
                itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: '60%',
                }}
                items={locationItems}
                //mapping of item array
                //default selected item index
                placeholder="Choose Location ID"
                //place holder for the search input
                resetValue={false}
                //reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                //To remove the underline from the android input
            />
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <TouchableOpacity style={styles.submit_button}
                                  onPress={() => {
                                      Alert.alert("The location of the product with "+ selectedItems.name+
                                      " id has been changed to "+ selectedLocationItems.name+".");}}>
                    <Text style={{color:"#FFF"}}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent:"center",
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    submit_button:{
        marginTop:50,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        width:100,
        height:50,
        backgroundColor: Colors.standartColor,
        borderStyle:"solid",
        borderColor:"#F8F8F8",
        borderBottomWidth:2,
        borderWidth:1,

    },

});
