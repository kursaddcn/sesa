import React, {useEffect, useState,useRef} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    DrawerLayoutAndroid, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Config/Colors";
import {StatusBar} from "expo-status-bar";
import filter from 'lodash.filter';
import _ from 'lodash';
import {Touchable} from "react-native-web";
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
const api = axios.create({
    baseURL: BaseUrl.baseURL
})

const storeProductId = async (selectedProductId)  =>{
    try {
        await AsyncStorage.setItem('productIdToDisplay', JSON.stringify(selectedProductId))
    } catch (e) {
        // saving error
    }
}
const storeProductLocation = async (selectedProductLocation)  =>{
    try {
        await AsyncStorage.setItem('productLocation', JSON.stringify(selectedProductLocation))
    } catch (e) {
        // saving error
    }
}
export default function ProductSearchScreen({navigation}){
    const drawer = useRef(null);
    const [products, setProducts]=useState([]);
    const [email, setEmail] = useState('');
    const [drawerPosition, setDrawerPosition] = useState("left");
    const [ascSorted,setAscSorted]=useState("false");
    const [descSorted,setDescSorted]=useState("false");
    const [isLoadingEmail,setLoadingEmail]=useState(false);
    const [isLoadingForProducts,setLoadingForProducts]=useState(false);
    const [dataJson, setDataJson] = useState([]);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(async () => {
        const mail = await AsyncStorage.getItem('email');
        setEmail(mail);
        console.log("hey",email);
        setLoadingEmail(true);

    }, [isLoadingEmail]);
    useEffect(() => {
        api.post("/getAllProducts")
            .then(res =>{
                console.log(res.data.allProducts);
                setProducts(res.data.allProducts);
                let allProducts = [];
                for (let i = 0; i < products.length; i++) {

                    const currProduct={ id: products[i].productId, title: products[i].title, cost:products[i].price, productFilters: products[i].productFilters,
                        location: products[i].location};
                    console.log(currProduct);
                    allProducts.push(currProduct);
                }
                setDataJson(allProducts);
                setLoadingForProducts(true);
            })
    }, [isLoadingEmail,isLoadingForProducts]);
    useEffect(() => {
        setData(dataJson);
    }, [dataJson]);

    async function filteredProducsts(){
        let userFilters = JSON.parse(await AsyncStorage.getItem('userFilters'));
        let lastIndices= [];
        let vegetarianIndices = []; let veganIndices = []; let pescatarianIndices = []; let glutenFreeIndices = [];
        let halalIndices = []; let kosherIndices = []; let crueltyFreeIndices = [];
        let notIncludesEgg = []; let notIncludesFish = []; let notIncludesMilk = []; let notIncludesPeanut = [];let notIncludesAlmond = [];
        let notIncludesCashew = []; let notIncludesWalnut = []; let notIncludesSesame = []; let notIncludesSoy = [];let notIncludesMushroom = [];
        for (let i = 0; i < dataJson.length; i++) {
            if(dataJson[i].productFilters[0].isVegetarian){
                vegetarianIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isVegan){
                veganIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isPescatarian){
                pescatarianIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isGlutenFree){
                glutenFreeIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isHalal){
                halalIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isKosher){
                kosherIndices.push(i);
            }
            if(dataJson[i].productFilters[0].isCrueltyFree){
                crueltyFreeIndices.push(i);
            }
            if(!dataJson[i].productFilters[0].isEggIncluded){
                notIncludesEgg.push(i);
            }
            if(!dataJson[i].productFilters[0].isFishIncluded){
                notIncludesFish.push(i);
            }
            if(!dataJson[i].productFilters[0].isMilkIncluded){
                notIncludesMilk.push(i);
            }
            if(!dataJson[i].productFilters[0].isPeanutIncluded){
                notIncludesPeanut.push(i);
            }
            if(!dataJson[i].productFilters[0].isAlmondIncluded){
                notIncludesAlmond.push(i);
            }
            if(!dataJson[i].productFilters[0].isCashewIncluded){
                notIncludesCashew.push(i);
            }
            if(!dataJson[i].productFilters[0].isWalnutIncluded){
                notIncludesWalnut.push(i);
            }
            if(!dataJson[i].productFilters[0].isSesameIncluded){
                notIncludesSesame.push(i);
            }
            if(!dataJson[i].productFilters[0].isSoyIncluded){
                notIncludesSoy.push(i);
            }
            if(!dataJson[i].productFilters[0].isMushroomIncluded){
                notIncludesMushroom.push(i);
            }
        }
        if(userFilters[0].isVegetarianSelected){
            const currIndex={ indices: vegetarianIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isVeganSelected){
            const currIndex={ indices: veganIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isPescatarianSelected){
            const currIndex={ indices: pescatarianIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isGlutenFreeSelected){
            const currIndex={ indices: glutenFreeIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isHalalSelected){
            const currIndex={ indices: halalIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isKosherSelected){
            const currIndex={ indices: kosherIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isCrueltyFreeSelected){
            const currIndex={ indices: crueltyFreeIndices};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isEggSelected){
            const currIndex={ indices: notIncludesEgg};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isFishSelected){
            const currIndex={ indices: notIncludesFish};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isMilkSelected){
            const currIndex={ indices: notIncludesMilk};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isPeanutSelected){
            const currIndex={ indices: notIncludesPeanut};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isAlmondSelected){
            const currIndex={ indices: notIncludesAlmond};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isCashewSelected){
            const currIndex={ indices: notIncludesCashew};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isWalnutSelected){
            const currIndex={ indices: notIncludesWalnut};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isSesameSelected){
            const currIndex={ indices: notIncludesSesame};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isSoySelected){
            const currIndex={ indices: notIncludesSoy};
            lastIndices.push(currIndex);
        }
        if(userFilters[0].isMushroomSelected){
            const currIndex={ indices: notIncludesMushroom};
            lastIndices.push(currIndex);
        }
        let tempArray=[];
        if(lastIndices.length!==0){
            if(lastIndices.length>1){
                for (let i = 0; i < lastIndices.length-1; i++) {
                    if(i===0){
                        tempArray=arrayMatch(lastIndices[0].indices,lastIndices[1].indices);
                    }
                    else{
                        tempArray=arrayMatch(tempArray,lastIndices[i+1].indices);
                    }
                }
                let productsForFilters= [];
                for (let i = 0; i < tempArray.length; i++) {

                    const currProduct={ id: dataJson[tempArray[i]].id, title: dataJson[tempArray[i]].title, cost:dataJson[tempArray[i]].cost, productFilters: dataJson[tempArray[i]].productFilters };

                    productsForFilters.push(currProduct);
                }
                setData(productsForFilters);
            }
            else if(lastIndices.length===1){
                let productsForFilters2= [];
                for (let i = 0; i < lastIndices[0].indices.length; i++) {

                    const currProduct={ id: dataJson[lastIndices[0].indices[i]].id, title: dataJson[lastIndices[0].indices[i]].title, cost:dataJson[lastIndices[0].indices[i]].cost, productFilters: dataJson[lastIndices[0].indices[i]].productFilters };

                    productsForFilters2.push(currProduct);
                }
                setData(productsForFilters2);
            }
        }
        else if(lastIndices.length===0){
            let productsForFilters3= [];
            setData(productsForFilters3);
        }
        drawer.current.closeDrawer();

    };
    function arrayMatch(arr1, arr2) {
        let arr = [];
        arr1 = arr1.toString().split(',').map(Number);
        arr2 = arr2.toString().split(',').map(Number);
        // for array1
        for (let i in arr1) {
            if(arr2.indexOf(arr1[i]) !== -1)
                arr.push(arr1[i]);
        }

        return arr.sort((x,y) => x-y);
    }
    function ascSortProducts(){
        const sorted = _.orderBy(data, 'cost','asc');
        setData(sorted);
        drawer.current.closeDrawer();
        setAscSorted('true');
        setDescSorted('false');
    };
    function descSortProducts(){
        const sorted = _.orderBy(data, 'cost','desc');
        setData(sorted);
        drawer.current.closeDrawer();
        setDescSorted('true');
        setAscSorted('false');
    };
    function addProductToList(idOfProduct){
        api.post("/updateUserProductList",{userMail:email,addedProductId:idOfProduct})
            .then(res =>{
                console.log(res.data.statCode);
            })

    }
    const navigationView = () => {
        if (drawerPosition === "left") {
            return (
                <View>
                    <View style={{backgroundColor: "#d9d9d9", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.paragraph}>Sort</Text>
                        <Text style={styles.paragraph} onStartShouldSetResponder={() => {
                            drawer.current.closeDrawer()
                        }}>X</Text>
                    </View>
                    <View>
                        <View onStartShouldSetResponder={() => {
                            ascSortProducts()
                        }}>
                            <Text style={[styles.paragraph, {borderBottomWidth: 1, borderBottomColor: '#d9d9d9',}]}>Lowest
                                Price</Text>
                        </View>
                        <View onStartShouldSetResponder={() => {
                            descSortProducts()
                        }}>
                            <Text style={[styles.paragraph, {borderBottomWidth: 1, borderBottomColor: '#d9d9d9',}]}>Highest
                                Price</Text>
                        </View>
                    </View>
                </View>
            );
        }
        else if (drawerPosition === "right") {
            return (
                <View>
                    <View style={{backgroundColor: "#d9d9d9", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.paragraph}>Filter</Text>
                        <Text style={styles.paragraph} onStartShouldSetResponder={() => {
                            drawer.current.closeDrawer()
                        }}>X</Text>
                    </View>
                    <View>
                        <View onStartShouldSetResponder={() => {
                            filteredProducsts()
                        }}>
                            <Text style={[styles.paragraph, {borderBottomWidth: 1, borderBottomColor: '#d9d9d9',}]}>Apply My Filters</Text>
                        </View>

                    </View>
                </View>
            );
        }

    };

    const handleSearch = (text) => {
        let formattedQuery = text.toLowerCase();
        let filteredData = filter(data, productTitle => {

            return contains(productTitle, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
        if(text==="" & ascSorted==="false" & descSorted==="false"){
            setData(dataJson);
        }
        else if(text==="" & ascSorted==="true" & descSorted==='false'){
            const sorted = _.orderBy(dataJson, 'cost','asc');
            setData(sorted);
        }
        else if(text==="" & descSorted==="true" & ascSorted==="false"){
            const sorted = _.orderBy(dataJson, 'cost','desc');
            setData(sorted);
        }

    };

    const contains = ({title}, query) => {
        let product = JSON.stringify(title);
        product = product.toLowerCase();
        if (product.includes(query)) {
            return true;
        }

        return false;
    };
    return(
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={drawerPosition}
            renderNavigationView={navigationView}
        >
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <View style={{flex: 9}}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="#3e3f40"
                            value={query}
                            onChangeText={queryText => handleSearch(queryText)}
                            placeholder={"Search on products"}
                        />
                    </View>
                    <View style={{flex: 1, paddingTop: 3}}>
                        <Icon name="magnify" size={24} color={Colors.standartColor}/>
                    </View>
                </View>
                <View style={{flex: 16}}>
                    <View style={styles.sortFilterBox}>
                        <View style={[styles.sortFilter, {borderRightColor: '#dddddd', borderRightWidth: 1}]}
                              onStartShouldSetResponder={() => {
                                  setDrawerPosition("left");
                                  drawer.current.openDrawer();
                              }}>
                            <Icon name="sort" size={24} color={Colors.standartColor} style={{marginRight: 10}}/>
                            <Text style={{fontSize: 17}}>Sort</Text>
                        </View>
                        <View style={styles.sortFilter}
                              onStartShouldSetResponder={() => {
                                  setDrawerPosition("right");
                                  drawer.current.openDrawer();
                              }}>
                            <Icon name="filter-outline" size={24} color={Colors.standartColor}
                                  style={{marginRight: 10}}/>
                            <Text style={{fontSize: 17}}>Filter</Text>
                        </View>
                    </View>
                    <View style={styles.productsBox}>
                        <FlatList
                            data={data}
                            contentContainerStyle={{paddingBottom: 10}}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <View style={styles.listItem}>
                                    <View style={styles.listItemText}
                                          onStartShouldSetResponder={() => {
                                              storeProductId(item.id);
                                              navigation.navigate('ProductDetailsScreen')
                                          }}>
                                        <View style={{width: '70%',marginRight:'5%'}}>
                                            <Text>{item.title}</Text>
                                        </View>
                                        <View style={{width: '25%'}}>
                                            <Text>{item.cost + ' TL'}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.buttonArea}>
                                        <View style={[styles.addListButton, {marginRight: 20}]}
                                              onStartShouldSetResponder={() => addProductToList(item.id)}>
                                            <Icon name="playlist-plus" size={25} color={Colors.standartColor}/>
                                        </View>
                                        <View style={styles.addListButton}
                                              onStartShouldSetResponder={() => {storeProductLocation([item.location]);
                                                  console.log(item.location);
                                                  navigation.navigate('ShoppingPathScreen')}}>
                                            <Icon name="map-marker-path" size={25} color={Colors.standartColor}/>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        </DrawerLayoutAndroid>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
    },
    textInput: {
        paddingLeft:10,
    },
    searchBox: {
        backgroundColor: '#e8eaed',
        marginTop: 10,
        marginBottom : 10,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom : 5,
        paddingLeft: 10,
        paddingRight: 20,
        flex:1,
        flexDirection:"row",
    },
    sortFilterBox:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    sortFilter:{
        width: '50%',
        paddingLeft: 10,
        paddingRight:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    productsBox:{
        flex: 1,
        borderTopColor: Colors.standartColor,
        borderTopWidth: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop:10
    },
    listItem: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
    },
    listItemText: {
        fontSize: 25,
        width: '80%',
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
    }
});
