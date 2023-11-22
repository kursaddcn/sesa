import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import CheckBox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import Fonts from "../Config/Fonts";
import {setgid} from "process";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const api = axios.create({
    baseURL: BaseUrl.baseURL
})
export default function FiltersScreen() {
    const [email, setEmail] = useState('');
    const [isVegetarianSelected, setVegetarianSelection] = useState(false);
    const [isVeganSelected, setVeganSelection] = useState(false);
    const [isPescatarianSelected, setPescatarianSelection] = useState(false);
    const [isGlutenFreeSelected, setGlutenFreeSelection] = useState(false);
    const [isHalalSelected, setHalalSelection] = useState(false);
    const [isKosherSelected, setKosherSelection] = useState(false);
    const [isEggSelected, setEggSelection] = useState(false);
    const [isFishSelected, setFishSelection] = useState(false);
    const [isMilkSelected, setMilkSelection] = useState(false);
    const [isPeanutSelected, setPeanutSelection] = useState(false);
    const [isAlmondSelected, setAlmondSelection] = useState(false);
    const [isCashewSelected, setCashewSelection] = useState(false);
    const [isWalnutSelected, setWalnutSelection] = useState(false);
    const [isSesameSelected, setSesameSelection] = useState(false);
    const [isSoySelected, setSoySelection] = useState(false);
    const [isMushroomSelected, setMushroomSelection] = useState(false);
    const [isCrueltyFreeSelected, setCrueltyFreeSelection] = useState(false);
    const [isLoading,setLoading]=useState(false);
    useEffect(async() => {
        const value = await AsyncStorage.getItem('email');
        setEmail(value);
        console.log(email);
        setLoading(true);
    }, []);

    useEffect(() => {
        api.post("/getUserFilters",{userMail:email})
            .then(res => {
                console.log(res.data);
                setVegetarianSelection(res.data.onlineUser.userFilters[0].isVegetarianSelected);
                setVeganSelection(res.data.onlineUser.userFilters[0].isVeganSelected);
                setPescatarianSelection(res.data.onlineUser.userFilters[0].isPescatarianSelected);
                setGlutenFreeSelection(res.data.onlineUser.userFilters[0].isGlutenFreeSelected);
                setHalalSelection(res.data.onlineUser.userFilters[0].isHalalSelected);
                setKosherSelection(res.data.onlineUser.userFilters[0].isKosherSelected);
                setEggSelection(res.data.onlineUser.userFilters[0].isEggSelected);
                setFishSelection(res.data.onlineUser.userFilters[0].isFishSelected);
                setMilkSelection(res.data.onlineUser.userFilters[0].isMilkSelected);
                setPeanutSelection(res.data.onlineUser.userFilters[0].isPeanutSelected);
                setAlmondSelection(res.data.onlineUser.userFilters[0].isAlmondSelected);
                setCashewSelection(res.data.onlineUser.userFilters[0].isCashewSelected);
                setWalnutSelection(res.data.onlineUser.userFilters[0].isWalnutSelected);
                setSesameSelection(res.data.onlineUser.userFilters[0].isSesameSelected);
                setSoySelection(res.data.onlineUser.userFilters[0].isSoySelected);
                setMushroomSelection(res.data.onlineUser.userFilters[0].isMushroomSelected);
                setCrueltyFreeSelection(res.data.onlineUser.userFilters[0].isCrueltyFreeSelected);
            })
    }, [isLoading]);

    const userFiltersForUpdate=[{
        isVegetarianSelected:isVegetarianSelected,
        isVeganSelected:isVeganSelected,
        isPescatarianSelected:isPescatarianSelected,
        isGlutenFreeSelected:isGlutenFreeSelected,
        isHalalSelected:isHalalSelected,
        isKosherSelected:isKosherSelected,
        isEggSelected:isEggSelected,
        isFishSelected:isFishSelected,
        isMilkSelected:isMilkSelected,
        isPeanutSelected:isPeanutSelected,
        isAlmondSelected:isAlmondSelected,
        isCashewSelected:isCashewSelected,
        isWalnutSelected:isWalnutSelected,
        isSesameSelected:isSesameSelected,
        isSoySelected:isSoySelected,
        isMushroomSelected:isMushroomSelected,
        isCrueltyFreeSelected:isCrueltyFreeSelected,
    }]
    const storeUserData = async (selectedFilter)  =>{
        try {
            await AsyncStorage.setItem('userFilters', JSON.stringify(selectedFilter))
        } catch (e) {
            // saving error
        }
    }

    storeUserData(userFiltersForUpdate).then(r =>  console.log(userFiltersForUpdate));
    //<Text>  Is CheckBox selected: {isVegetarianSelected ? "👍" : "👎"}</Text>
    function submitFilterChange(){
        api.post("/updateUserFilters",{userMail:email,userFilter:userFiltersForUpdate})
            .then(res =>{

                if(res.data.statCode === 2){
                    Alert.alert("Filters are changed.")
                }
            })

    }
    return(
        <View style={styles.container}>
            <View style={styles.optionsBox}>
                <Text style={{marginBottom:5}}>Type of diet:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox
                        value={isVegetarianSelected}
                        onValueChange={setVegetarianSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Vegetarian</Text>

                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isVeganSelected}
                        onValueChange={setVeganSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Vegan</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isPescatarianSelected}
                        onValueChange={setPescatarianSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Pescatarian</Text>

                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isGlutenFreeSelected}
                        onValueChange={setGlutenFreeSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Gluten-free</Text>
                </View>
                <Text style={{marginTop:15,marginBottom:5}}>Eating pattern:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox
                        value={isHalalSelected}
                        onValueChange={setHalalSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Halal</Text>

                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isKosherSelected}
                        onValueChange={setKosherSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Kosher</Text>
                </View>

                <Text style={{marginTop:15,marginBottom:5}}>Allergic:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox
                        value={isEggSelected}
                        onValueChange={setEggSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Egg</Text>

                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isFishSelected}
                        onValueChange={setFishSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Fish</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isMilkSelected}
                        onValueChange={setMilkSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Milk</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isPeanutSelected}
                        onValueChange={setPeanutSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Peanut</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isAlmondSelected}
                        onValueChange={setAlmondSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Almond</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isCashewSelected}
                        onValueChange={setCashewSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Cashew</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isWalnutSelected}
                        onValueChange={setWalnutSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Walnut</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isSesameSelected}
                        onValueChange={setSesameSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Sesame</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isSoySelected}
                        onValueChange={setSoySelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Soy</Text>
                </View>
                <View style={{ flexDirection: 'row',marginTop:5 }}>
                    <CheckBox
                        value={isMushroomSelected}
                        onValueChange={setMushroomSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Mushroom</Text>
                </View>

                <Text style={{marginTop:15,marginBottom:5}}>Special options:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox
                        value={isCrueltyFreeSelected}
                        onValueChange={setCrueltyFreeSelection}
                        style={styles.checkboxStyle}
                    />
                    <Text>Cruelty-free</Text>

                </View>
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <TouchableOpacity style={styles.submit_button}
                                  onPress={() => {submitFilterChange();}}>
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
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
        justifyContent: 'flex-start',
    },
    optionsBox:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:10,
        marginBottom:5,
        flexDirection: 'column',
    },
    checkboxStyle:{
        marginRight:4
    },
    submit_button:{
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
