import Colors from "../Config/Colors";
import React, {useState, useEffect, useMemo} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useIsFocused} from "@react-navigation/native";
import Svg, {Line, Rect, Text} from "react-native-svg";
let count=0;
import axios from "axios";
import BaseUrl from "../Config/BaseUrl";
import _ from "lodash";
import {TouchableOpacity} from "react-native-web";
const api = axios.create({
    baseURL: BaseUrl.baseURL
})
let productsWithInfo = [];
let sortedByPrice = [];
let calculatedProds = [];

let borderColor="";
const storeProductId = async (selectedProductId)  =>{
    try {
        await AsyncStorage.setItem('productIdToDisplay', JSON.stringify(selectedProductId))
    } catch (e) {
        // saving error
    }
}

let userFilters =[] ;
async function filterCaller (){
    userFilters = JSON.parse(await AsyncStorage.getItem('userFilters'));
}
//onBarCodeScanned={scanned ? handleBarCodeScanned : handleBarCodeScanned }
//<Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
//<View><Text> {singleScannedProductID} product scanned ! </Text></View>


export default function QRScreen({navigation}) {
    filterCaller();

    const [modeQR, setModeQR] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [singleScannedProductID, setSingleScannedProductID] = useState(undefined);

    const [singleQRCornerPoints, setSingleQRCornerPoints] = useState(undefined);

    useEffect(async () => {
        const mode = await AsyncStorage.getItem('modeQR');
        setModeQR(mode);
    }, [modeQR]);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if(modeQR==="Product Detail"){

        const handleBarCodeScanned = ({ type, data ,bounds,cornerPoints}) => {
            setScanned(true);
            setSingleScannedProductID(data);
            //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        };

        if (hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View style={styles.container}>

                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned }
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned &&storeProductId(parseInt(singleScannedProductID.toString())) && navigation.navigate("ProductDetailByQRScreen")}
            </View>
        )


    }
    else if ("Advanced Scanner"){

        async function filteredProducsts(productID){

            for (let i = 0; i < productsWithInfo.length; i++) {
                if(productID.toString()===productsWithInfo[i].productId.toString()){
                    if(userFilters[0].isVegetarianSelected){
                        if(productsWithInfo[i].productFilters[0].isVegetarian===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isVeganSelected){
                        if(productsWithInfo[i].productFilters[0].isVegan===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isPescatarianSelected){
                        if(productsWithInfo[i].productFilters[0].isPescatarian===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isGlutenFreeSelected){
                        if(productsWithInfo[i].productFilters[0].isGlutenFree===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isHalalSelected){
                        if(productsWithInfo[i].productFilters[0].isHalal===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isKosherSelected){
                        if(productsWithInfo[i].productFilters[0].isKosher===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isCrueltyFreeSelected){
                        if(productsWithInfo[i].productFilters[0].isCrueltyFree===false){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isEggSelected){
                        if(productsWithInfo[i].productFilters[0].isEggIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isFishSelected){
                        if(productsWithInfo[i].productFilters[0].isFishIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isMilkSelected){
                        if(productsWithInfo[i].productFilters[0].isMilkIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isPeanutSelected){
                        if(productsWithInfo[i].productFilters[0].isPeanutIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isAlmondSelected){
                        if(productsWithInfo[i].productFilters[0].isAlmondIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isCashewSelected){
                        if(productsWithInfo[i].productFilters[0].isCashewIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isWalnutSelected){
                        if(productsWithInfo[i].productFilters[0].isWalnutIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isSesameSelected){
                        if(productsWithInfo[i].productFilters[0].isSesameIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isSoySelected){
                        if(productsWithInfo[i].productFilters[0].isSoyIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    if(userFilters[0].isMushroomSelected){
                        if(productsWithInfo[i].productFilters[0].isMushroomIncluded===true){
                            borderColor= "red";
                            break;
                        }
                    }
                    borderColor= "green";
                    break;
                }
            }
        };

            function getSortedIProducts (){

            for (let i = 0; i < calculatedProds.length; i++) {
                api.post("/getProductByIdSync",{productId: calculatedProds[i].prodID})
                    .then(res => {
                        let flag = true;
                        for (let j = 0; j < productsWithInfo.length; j++) {
                            let currID = productsWithInfo[j].productId;
                            if (res.data.instantProduct.productId === currID){
                                flag = false;
                                break;
                            }
                        }
                        if(flag){
                            productsWithInfo.push(res.data.instantProduct);
                        }

                    })
            }
            sortedByPrice = _.orderBy(productsWithInfo, 'price','asc');

        }
       let resulte = [];
        function bringTheSortOrder (idFromOriginal){
            for (let i = 0; i < sortedByPrice.length; i++) {
                if (sortedByPrice[i].productId.toString() === idFromOriginal.toString()){
                    return (i+1);
                }
            }
        }
       function frameDrawer(corner1,corner2,corner3,corner4,filterColor,price,keyke,prodID){
           return (
           <Svg key={keyke}>
               <Text x={corner1.x + 10} y={corner1.y -10}
                     fill="none"
                     stroke="purple"
                     fontSize="20"
                     fontWeight="bold">
               {price}</Text>
               {filterColor === "red" ?
                   <View>
                   <Rect
                       x={ corner1.x}
                       y={corner1.y}
                       width={(corner2.x-corner1.x)}
                       height={(corner4.y-corner1.y)}
                       fill="rgba(255,0,0,0.2)"
                       onStartShouldSetResponder={()=>{
                           storeProductId(parseInt(prodID.toString())) &&( navigation.navigate("ProductDetailByQRScreen"))
                       }}

                   />

                   </View>
                   :
                   <View>

                   <Rect
                   x={corner1.x}
                   y={corner1.y}
                   width={(corner2.x-corner1.x)}
                   height={(corner4.y-corner1.y)}
                   fill="rgba(179, 255, 179,0.5)"
                   onStartShouldSetResponder={()=>{
                       storeProductId(parseInt(prodID.toString())) && ( navigation.navigate("ProductDetailByQRScreen"))
                   }}/>
                   </View>
               }

               <Line x1={corner1.x} y1={corner1.y} x2={corner2.x} y2={corner2.y} stroke={filterColor} strokeWidth="2" />
               <Line x1={corner2.x} y1={corner2.y} x2={corner3.x} y2={corner3.y} stroke={filterColor} strokeWidth="2" />
               <Line x1={corner3.x} y1={corner3.y} x2={corner4.x} y2={corner4.y} stroke={filterColor} strokeWidth="2" />
               <Line x1={corner4.x} y1={corner4.y} x2={corner1.x} y2={corner1.y} stroke={filterColor} strokeWidth="2" />
           </Svg>)
       }
       function generalDrawer(){

            if (calculatedProds.length<5) {
                getSortedIProducts();
                for (let i = 0; i < calculatedProds.length; i++) {
                        filteredProducsts((calculatedProds[i].prodID).toString());
                        resulte.push(frameDrawer(
                            calculatedProds[i].prodCorners[0],
                            calculatedProds[i].prodCorners[1],
                            calculatedProds[i].prodCorners[2],
                            calculatedProds[i].prodCorners[3],
                            borderColor,
                            bringTheSortOrder(calculatedProds[i].prodID),
                            i,
                           calculatedProds[i].prodID
                        ));

                }

            }
        }

        const handleBarCodeScanned = ({ type, data ,bounds,cornerPoints}) => {
            let flag = true;
            setScanned(true);
            for (let i = 0; i < calculatedProds.length; i++) {
                if (calculatedProds[i].prodID === data){
                    calculatedProds[i].prodPosition = bounds.origin;
                    calculatedProds[i].prodCorners = cornerPoints;
                    flag = false;
                }
            }
            if (flag){
                calculatedProds.push({prodID: data, prodPosition: bounds.origin , prodCorners: cornerPoints});
            }

            setSingleQRCornerPoints(cornerPoints);
        };


        if (hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }


        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && generalDrawer()}
                <Svg>
                 {resulte}
                </Svg>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
