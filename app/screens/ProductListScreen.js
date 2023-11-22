import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList, Pressable, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import Fonts from "../Config/Fonts";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const api = axios.create({
    baseURL: BaseUrl.baseURL
})
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('productListArray', JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}
export default function ProductListScreen({navigation}) {
    const [locationArray,setLocationArray] = useState([]);
    const [email, setEmail] = useState('');
    const [productList, setProductList] = useState([]);
    const [productListToDisplay, setProductListToDisplay] = useState([]);
    const [isLoadingEmail,setLoadingEmail]=useState(false);
    const [isLoadingProductList,setLoadingProductList]=useState(false);
    const [isLoadingProductListToDisplay,setLoadingProductListToDisplay]=useState(false);
    const [totalCost, setTotalCost] =useState(0);

    const [data, setData] = useState([]);
    useEffect(async () => {
        const mail = await AsyncStorage.getItem('email');
        if(mail!=="") setEmail(mail);
        setLoadingEmail(true);

    },[isLoadingEmail]);
    useEffect(() => {
        if(email!=="") {
            api.post("/getUserProductList", {userMail: email})
                .then(res => {
                    let currProductList = [];
                    for (let i = 0; i < res.data.onlineUser.userProductList.length; i++) {
                        const currProduct = res.data.onlineUser.userProductList[i];

                        currProductList.push(currProduct);

                    }
                    setProductList(currProductList);
                    setLoadingProductList(true);
                })
        }
    }, [isLoadingEmail,isLoadingProductList]);


    useEffect(() => {

        if(productList.length!==0) {
            let productListTemp = [];
            let yaz=[];
            let cost=0;
            for (let i = 0; i < productList.length; i++) {

                let param = productList[i];
                api.post("/getProductById", {productId: param})
                    .then(res => {
                        const currProduct = {
                            id: i.toString(),
                            productId: res.data.instantProduct.productId,
                            title: res.data.instantProduct.title,
                            price: res.data.instantProduct.price,
                            location: parseInt(res.data.instantProduct.location)+1
                        };
                        yaz.push(currProduct.location);
                        cost+= parseFloat(currProduct.price);
                        productListTemp.push(currProduct);
                        if( i === productList.length-1){
                            setTotalCost(cost);
                        }
                        storeData(yaz);
                    }
                    )
            }
            setLocationArray(yaz);
            setProductListToDisplay(productListTemp);
            setLoadingProductListToDisplay(true);

        }

    }, [isLoadingProductList]);

    useEffect(() => {
        setData(productListToDisplay);
        console.log(locationArray);
    }, [isLoadingProductListToDisplay]);

    function deleteList(){
        api.post("/deleteUserProductList",{userMail:email})
            .then(res =>{

                if(res.data.stat===true){
                    Alert.alert("List is deleted.")
                }
            })
    }
    return(
        <View style={styles.container}>


                {totalCost !== 0
                    ?
                    <View style={{flex: 16}}>
                        <View style={styles.productsBox}>
                            <FlatList
                                data={data}
                                contentContainerStyle={{paddingBottom: 10}}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => (
                                    <View style={styles.listItem}>
                                        <View style={styles.listItemText}>
                                            <View style={{width: '75%'}}>
                                                <Text>{item.title}</Text>
                                            </View>
                                            <View style={{width: '25%'}}>
                                                <Text>{item.price + ' TL'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    <View>
                        <Text style={styles.costField}>Total cost: {totalCost.toFixed(2)} TL</Text>
                    </View>
                    <View style={styles.sortFilterBox}>
                        <View style={[styles.sortFilter, {borderRightColor: '#dddddd', borderRightWidth: 2,borderLeftColor: '#dddddd', borderLeftWidth: 2,}]}
                              onStartShouldSetResponder={() => {
                                  deleteList(); setData([]); setTotalCost(0);
                              }}>
                            <Icon name="delete-forever" size={24} color={Colors.standartColor} style={{marginRight: 10}}/>
                            <Text style={{fontSize: 17}}>Delete List</Text>
                        </View>
                        <View style={[styles.sortFilter, {borderRightColor: '#dddddd', borderRightWidth: 2}]}
                              onStartShouldSetResponder={() => {
                                  navigation.navigate("ShoppingPathForListScreen")
                              }}>
                            <Icon name="navigation" size={24} color={Colors.standartColor}
                                  style={{marginRight: 10}}/>
                            <Text style={{fontSize: 17}}>Navigate</Text>
                        </View>
                    </View>
                    </View>
                    :<Text style={{textAlign: "center",marginTop:"50%",fontSize:18}}>Your Shopping List is Empty</Text>
                }



        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection:"column",
    },
    textBox:{
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        fontSize:15,

    },
    sortFilterBox:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2,
        borderTopColor: '#dddddd',
        borderTopWidth: 2,
        flexDirection: 'row',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginBottom:30
    },
    sortFilter:{
        width: '50%',
        paddingLeft: 10,
        paddingRight:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor:'#fff'
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
    productsBox:{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop:10
    },
    listItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
    },
    listItemText: {
        fontSize: 25,
        width: '100%',
        flexDirection: 'row',
    },
    buttonArea:{
        width: '20%',
        flexDirection: 'row',
    },
    addListButton: {
        backgroundColor: '#fff',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
    },
    costField: {
        fontSize: 15,
        textAlign: 'right',
        paddingBottom:15,
        paddingRight:15
    }
});
