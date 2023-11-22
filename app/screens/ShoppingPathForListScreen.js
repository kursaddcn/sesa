import {StyleSheet, View} from 'react-native';
import Svg, {Ellipse, Image, Line, Text,} from 'react-native-svg';
import React, {useEffect, useState} from 'react';
import GraphShortestPath from "../GraphData/GraphShortestPath";
import GraphNodesAndLocations from "../GraphData/GraphNodesAndLocations";
import TSPSolver from '@nikbelikov/tsp-solver';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import {manager} from "./BleManager";
const windowWidth = Dimensions.get('window').width;
let trilateration = require('node-trilateration');


export default function ShoppingPathForListScreen({navigation}) {

    const [distanceToTerminal_1, setDistanceToTerminal_1] = useState(0);
    const [distanceToTerminal_2, setDistanceToTerminal_2] = useState(0);
    const [distanceToTerminal_3, setDistanceToTerminal_3] = useState(0);

    const [position, setPosition] = useState({x:0,y:0});

    useEffect(() => {
        manager.startDeviceScan(null, {allowDuplicates: false, scanMode: 1}, (error, device) => {

            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log(error);
                return
            }

            if (device.id.toString() === 'D1:F5:4C:FF:8B:4D') {
                if (device.rssi !== null) {
                    const rssi = device.rssi;
                    let dist = (Math.pow(10, (-56 - rssi) / (10 * 3))).toString()
                    //console.log("dist1",dist);
                    let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                    setDistanceToTerminal_1(distEdited);
                }
            }
            if (device.id.toString() === 'C4:D0:23:C7:44:2B') {
                if (device.rssi !== null) {
                    const rssi = device.rssi;
                    let dist = (Math.pow(10, (-57 - rssi) / (10 *3))).toString()
                    //console.log("dist2",dist);
                    let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                    setDistanceToTerminal_2(distEdited);

                }
            }
            if (device.id.toString() === 'D2:5F:8E:82:C2:06') {
                if (device.rssi !== null) {
                    const rssi = device.rssi;
                    let dist = (Math.pow(10, (-50 - rssi) / (10 * 3))).toString()
                    //console.log("dist3",dist);
                    let distEdited = parseFloat(parseFloat(dist).toFixed(1));
                    setDistanceToTerminal_3(distEdited);

                }
            }
        });
    }, [manager]);

    useEffect(  () => {
        let isMount = true;
        if(isMount){
            let beacons = [
                {x: 0.1, y: 4.27, distance: parseFloat(distanceToTerminal_1.toString())},
                {x: 4.9, y: 3.32, distance: parseFloat(distanceToTerminal_2.toString())},
                {x: 2.5, y: 0.1, distance: parseFloat(distanceToTerminal_3.toString())}

            ];

            let posit = trilateration.calculate(beacons);
            //console.log(posit)
            if (parseFloat(posit.x.toString()) > 0 && parseFloat(posit.y.toString()) > 0) {
                setPosition({x: parseFloat(posit.x.toString()), y: parseFloat(posit.y.toString())});
            } else {
                console.log("- li değerler geldi.");
            }

        }else{
            return ()=>{
                console.log("Unmounted")
            }
        }

    },[manager,distanceToTerminal_1,distanceToTerminal_2,distanceToTerminal_3])


    const [productList, setProductList] = useState([]);
    const [isLoading,setLoading]=useState(false);
    let preProducts = [0];
    useEffect(async () => {
        const arrayProduct = JSON.parse(await AsyncStorage.getItem('productListArray'));
        setProductList(arrayProduct);
        setLoading(true);

    },[isLoading]);
    for (let i = 0; i < productList.length; i++) {
        preProducts.push(productList[i]);
    }

    //console.log("pre",preProducts);
    const graphData = [];
    const subGraphValues = [];
    const subGraphPoints = [];
    const reducedGraphDataToGetPath = [];


    let products = [0];
    preProducts.push(1);
    for (let j = 0; j < preProducts.length; j++) {
        let currentElement = preProducts[j];
        let flag = true;
        for (let k = 0; k < products.length ; k++) {
            if(currentElement===products[k]){
                flag = false;
                break;
            }
        }
        if(flag){
            products.push(currentElement);
        }
    }
    //console.log("SON HALİ:",products);


    //Here we take the input from users depending on the products location index.
    /*
    products.push(15,21,24,22,19);
    products.push(1);
    */

    // Here we import graph data produced by FloydWarshall Algorithm.
    let ShortestPathsGraphData = GraphShortestPath.data;
    //Here we split with commas to reach each edge element
    const graphDataSplitted = ShortestPathsGraphData.split(",");
    //Here we detect weights, begin and end vertices for each element and push into graphData
    for (let i = 0; i < graphDataSplitted.length; i++) {
        const currObject=
            {set: [parseInt(graphDataSplitted[i].split("_")[0].split(":")[0]),parseInt(graphDataSplitted[i].split("_")[0].split(":")[1])]
                ,value:parseInt(graphDataSplitted[i].split("_")[2])};
        graphData.push(currObject);
    }
    //This method finds the weights of edges. Which are needed to create a subgraph for TSP.
    const findWeight = (graph, vertex_1, vertex_2) => {
        const el = graph.find(el => ((el.set[0] === vertex_1 && el.set[1] === vertex_2) || ((el.set[0] === vertex_2 && el.set[1] === vertex_1)))); // Possibly returns `undefined`
        return el.value;
    }

    //Here we form the subgraph data to satisfy algorithms input format.
    //In Addition here we reassign the indexes of each vertex to satisfy input format.
    for (let i = 0; i < products.length; i++) {
        for (let j = i+1; j < products.length ; j++) {
            let weight = findWeight(graphData,products[i],products[j]);
            const currObject= {set: [i,j], value:parseInt(weight)};
            subGraphValues.push(currObject);
        }
    }

    //Here we define points with the actual names.
    for (let i = 0; i < products.length; i++) {
        const subGraphPoint = {id:i,name:products[i].toString()};
        subGraphPoints.push(subGraphPoint)
    }

    //Here we call TSP Solver method.
    const solved = TSPSolver(subGraphPoints,subGraphValues);
    //Here we have actual path indexes with the orders.
    const pathResult = [];
    for (let i = 0; i < solved.result.length; i++) {
        pathResult.push(parseInt(solved.result[i].name))
    }

    //////////////
    for (let i = 0; i < graphDataSplitted.length; i++) {
        const currObject=
            {set: [parseInt(graphDataSplitted[i].split("_")[0].split(":")[0]),parseInt(graphDataSplitted[i].split("_")[0].split(":")[1])]
                ,path:graphDataSplitted[i].split("_")[1].split("-")};
        reducedGraphDataToGetPath.push(currObject);
    }

    const findPathBetweenNodes = (graph, vertex_1, vertex_2) => {
        const el = graph.find(el => ((el.set[0] === vertex_1 && el.set[1] === vertex_2) || ((el.set[0] === vertex_2 && el.set[1] === vertex_1)))); // Possibly returns `undefined`
        return el.path;
    }


    const actualFinalResult = [];

    for (let i = 0; i < pathResult.length-1; i++) {
        actualFinalResult.push(findPathBetweenNodes(reducedGraphDataToGetPath,pathResult[i],pathResult[i+1]));
    }

    const FINALRESULT = [];
   // console.log(pathResult[0]);
    for (let i = 0; i < actualFinalResult.length ; i++) {
        if(i===0){
            if(pathResult[0].toString() !== actualFinalResult[0][0].toString()){
                let tempArr = [];
                for (let j = 0; j < actualFinalResult[0].length; j++) {
                    tempArr.push(actualFinalResult[0][j]);
                }
                const reversedInitalPath = tempArr.reverse();
                FINALRESULT.push(reversedInitalPath);
            }
            else{
                const initalPath = actualFinalResult[0];
                FINALRESULT.push(initalPath);
            }
        }
        else{
            if(FINALRESULT[i-1][FINALRESULT[i-1].length-1].toString() !== actualFinalResult[i][0].toString()){
                let tempArr1 = [];
                for (let j = 0; j < actualFinalResult[i].length; j++) {
                    tempArr1.push(actualFinalResult[i][j]);
                }

                const reversedPath = tempArr1.reverse();
                FINALRESULT.push(reversedPath);
            }
            else{
                const samePath = actualFinalResult[i];
                FINALRESULT.push(samePath);
            }
        }
    }


    const shortestPathFirstIteration = [];
    const shortestPathResult = [];
    for (let i = 0; i <FINALRESULT.length ; i++) {
        for (let j = 0; j <FINALRESULT[i].length ; j++) {
            shortestPathFirstIteration.push(parseInt(FINALRESULT[i][j]));
        }
    }
    for (let i = 0; i < shortestPathFirstIteration.length; i++) {
        if(i!== shortestPathFirstIteration.length -1){
            if (shortestPathFirstIteration[i] === shortestPathFirstIteration[i+1]){
                shortestPathResult.push(shortestPathFirstIteration[i]);
                i++;
            }else{
                shortestPathResult.push(shortestPathFirstIteration[i]);
            }
        }
        else{
            if (shortestPathFirstIteration[i] === shortestPathFirstIteration[i-1]){
                break;
            }
            else{
                shortestPathResult.push(shortestPathFirstIteration[i]);
            }
        }
    }
   // console.log("GERÇEK SONUÇ:");
    //console.log(shortestPathResult);
    let graphNodesAndLocations = GraphNodesAndLocations.data;
    //console.log(graphNodesAndLocations);
    const positionOfVertexCalculator = (locationSet, vertexID) => {
        return locationSet.find(el => {
            return (el.nodeID === vertexID);
        });
    }

    let displayer = [];
    let displayProds = [];

    function  wholePathDrawer(){
        for (let i = 0; i < shortestPathResult.length-1; i++) {
            const positionsBeg = positionOfVertexCalculator(graphNodesAndLocations,shortestPathResult[i]);
            const positionsEnd = positionOfVertexCalculator(graphNodesAndLocations,shortestPathResult[i+1]);
            displayer.push(<Svg key={i}>
                <Line x1={positionsBeg.positionX} y1={positionsBeg.positionY} x2={positionsEnd.positionX} y2={positionsEnd.positionY} stroke="red" strokeWidth="2" />
            </Svg>)
        }
    }
    //console.log(pathResult);
    let drawVertexesWithoutEndAndBegin = [];
    for (let i = 0; i <pathResult.length ; i++) {
        if(i!==0 && i!== pathResult.length-1){
            drawVertexesWithoutEndAndBegin.push(pathResult[i]);
        }
    }

    for (let i = 0; i <drawVertexesWithoutEndAndBegin.length ; i++) {
        const position = positionOfVertexCalculator(graphNodesAndLocations,drawVertexesWithoutEndAndBegin[i]);
        displayProds.push(<Svg key = {i}>
            <Ellipse
                cx={position.positionX}
                cy={position.positionY}
                rx="10"
                ry="10"
                stroke="green"
                strokeWidth="2"
                fill="green"
            > </Ellipse>
            <Text
                x={position.positionX}
                y={position.positionY+4}
                textAnchor="middle"
                fontWeight="bold"
                fontSize="15"
                fill="white"
            >
                {i+1}
            </Text>

        </Svg>)


    }


    wholePathDrawer();
    return (
        <Svg>
            <Image
                x="0"
                y="0"
                width={windowWidth}
                height={windowWidth*(4/3)}
                href={require('../assets/MarketMap.png')}
            >
            </Image>
            <Svg height="10" width="10">
                <Ellipse
                    cx={(position.x*100*windowWidth)/(500)}
                    cy={((windowWidth*4)/(3))-(((position.y*100*windowWidth*4)/(3))/(585))}
                    rx="10"
                    ry="10"
                    stroke="#000"
                    strokeWidth="3"
                    fill="blue"
                />
            </Svg>
            {displayer}
            {displayProds}


        </Svg>

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
    }}
);
