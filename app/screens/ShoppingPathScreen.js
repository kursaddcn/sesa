import {StyleSheet,View} from 'react-native';
import Svg, {Ellipse, Image, Line, Text,} from 'react-native-svg';
import React, {useEffect, useState} from 'react';
import GraphShortestPath from "../GraphData/GraphShortestPath";
import GraphNodesAndLocations from "../GraphData/GraphNodesAndLocations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';
import {manager} from "./BleManager";
const windowWidth = Dimensions.get('window').width;
let trilateration = require('node-trilateration');
let flag = true;
let flagSecond = true;
let begPoint;

export default function ShoppingPathScreen() {

    const [distanceToTerminal_1, setDistanceToTerminal_1] = useState(0);
    const [distanceToTerminal_2, setDistanceToTerminal_2] = useState(0);
    const [distanceToTerminal_3, setDistanceToTerminal_3] = useState(0);
    const [position, setPosition] = useState({x:0,y:0});
    const [targetPoint, setTargetPoint] = useState(0);


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
                        let dist = (Math.pow(10, (-57 - rssi) / (10 * 3))).toString()
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
        if(position.x === 0 && position.y === 0) {
            let isMount = true;
            if (isMount) {
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

            } else {
                return () => {
                    console.log("Unmounted")
                }
            }
        }

    },[manager,distanceToTerminal_1,distanceToTerminal_2,distanceToTerminal_3])

    let val = 100;
    while(val > 26 || val < 1){
        val = Math.floor(position.y / 0.95) * 4 + 2 + Math.floor(position.x / 1.25);
        if(val>1 && val <26){
            break;
        }
    }
        begPoint = val;
        let displayer = [];
        let displayProds = [];

        const getData = async () => {
            try {
                const response = await AsyncStorage.getItem('productLocation')
                const data = response
                const result = JSON.parse(data)
                setTargetPoint(parseInt(result[0]) + 1);
                console.log("BUDLİK", targetPoint)
            } catch (err) {
                console.log(err)
            }
        }

        getData().then(r => console.log(r));


        const positionOfVertexCalculator = (locationSet, vertexID) => {

            return locationSet.find(el => {
                return (el.nodeID === vertexID);
            });

        }
        let ShortestPathsGraphData = GraphShortestPath.data;
        let graphNodesAndLocations = GraphNodesAndLocations.data;

        if (begPoint !== targetPoint) {

            // Here we import graph data produced by FloydWarshall Algorithm.

            //Here we split with commas to reach each edge element
            const graphDataSplitted = ShortestPathsGraphData.split(",");
            //Here we detect weights, begin and end vertices for each element and push into graphData
            const graphData = [];
            for (let i = 0; i < graphDataSplitted.length; i++) {
                const currObject =
                    {
                        set: [parseInt(graphDataSplitted[i].split("_")[0].split(":")[0]), parseInt(graphDataSplitted[i].split("_")[0].split(":")[1])]
                        , path: graphDataSplitted[i].split("_")[1]
                    };
                graphData.push(currObject);
            }

            const findPathBetweenNodes = (graph, vertex_1, vertex_2) => {
                const el = graph.find(el => ((el.set[0] === vertex_1 && el.set[1] === vertex_2) || ((el.set[0] === vertex_2 && el.set[1] === vertex_1)))); // Possibly returns `undefined`
                return el.path;
            }
            const pathToTargetProduct = findPathBetweenNodes(graphData, begPoint, targetPoint);
            let wayToProd = pathToTargetProduct.split("-");
            let resPath = [];
            for (let i = 0; i < wayToProd.length; i++) {
                resPath.push(parseInt(wayToProd[i]));
            }

            for (let i = 0; i < resPath.length - 1; i++) {
                const positionsBeg = positionOfVertexCalculator(graphNodesAndLocations, resPath[i]);
                const positionsEnd = positionOfVertexCalculator(graphNodesAndLocations, resPath[i + 1]);
                displayer.push(<Svg key={i}>
                    <Line x1={positionsBeg.positionX} y1={positionsBeg.positionY} x2={positionsEnd.positionX}
                          y2={positionsEnd.positionY}
                          stroke="red" strokeWidth="2"/>
                </Svg>)
            }
            for (let i = 0; i < 2; i++) {
                let position;
                if (i === 0) {
                    position = positionOfVertexCalculator(graphNodesAndLocations, begPoint);
                } else {
                    position = positionOfVertexCalculator(graphNodesAndLocations, targetPoint);
                }

                displayProds.push(<Svg key={i}>
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
                        y={position.positionY + 5}
                        textAnchor="middle"
                        fontWeight="bold"
                        fontSize="13"
                        fill="white"
                    >
                        {i === 0 ? "B" : "T"}
                    </Text>
                </Svg>)
            }

        } else {
            let position = positionOfVertexCalculator(graphNodesAndLocations, targetPoint);
            displayProds.push(<Svg key={0}>
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
                    y={position.positionY + 4}
                    textAnchor="middle"
                    fontWeight="bold"
                    fontSize="15"
                    fill="white"
                >
                    {1}
                </Text>
            </Svg>);
        }

        return (
            <Svg>
                <Image
                    x="0"
                    y="0"
                    width={windowWidth}
                    height={windowWidth * (4 / 3)}
                    href={require('../assets/MarketMap.png')}
                >
                </Image>
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

