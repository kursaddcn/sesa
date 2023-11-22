import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Pressable, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import Fonts from "../Config/Fonts";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const api = axios.create({
    baseURL: BaseUrl.baseURL
})
export default function ProductDetailsScreen({navigation}) {
    const [givenProductId, setGivenProductId] = useState('');
    const [titleOfProduct, setTitleOfProduct] = useState('');
    const [priceOfProduct, setPriceOfProduct] = useState('');
    const [ingredientsOfProduct, setIngredientsOfProduct] = useState('');
    const [extraInformationOfProduct, setExtraInformationOfProduct] = useState('');
    const [isLoading,setLoading]=useState(false);
    useEffect(async() => {
        const value = await AsyncStorage.getItem('productIdToDisplay');
        setGivenProductId(value);
        console.log(givenProductId);
        setLoading(true);
    }, []);

    useEffect(() => {

        api.post("/getProductById",{productId:givenProductId})
            .then(res => {
                console.log(res.data);
                console.log(givenProductId);
                setTitleOfProduct(res.data.instantProduct.title);
                setPriceOfProduct(res.data.instantProduct.price);
                setIngredientsOfProduct(res.data.instantProduct.ingredients);
                setExtraInformationOfProduct(res.data.instantProduct.extraInformation);
            })
    }, [isLoading]);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    {titleOfProduct}
                </Text>
                <Text style={styles.textPrice}>
                    {priceOfProduct+' TL'}
                </Text>
                <Text style={[styles.textBox,{ textDecorationLine: 'underline'}]}>
                    Ingredients:
                </Text>
                <Text style={styles.textBox}>
                    {ingredientsOfProduct}
                </Text>
                <Text style={[styles.textBox,{ textDecorationLine: 'underline'}]}>
                    Extra Information:
                </Text>
                <Text style={styles.textBox}>
                    {extraInformationOfProduct}
                </Text>
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
        justifyContent: 'flex-start',
        paddingTop:20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    textBox:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        fontSize:15,

    },
    title:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:10,
        fontSize:18,
        fontWeight:"bold"
    },
    textPrice:{
        marginRight: 20,
        marginTop:10,
        fontSize:18,
        textAlign: 'right',
        color: Colors.standartColor
    },

});
