import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = windowWidth*4/3;

export default {
    data:[
        {nodeID:0,positionX:(windowWidth/8),positionY:windowHeight},
        {nodeID:1,positionX:(windowWidth*7/8),positionY:windowHeight},
        {nodeID:2,positionX:(windowWidth/8),positionY:(windowHeight*11/12)},
        {nodeID:3,positionX:(windowWidth*3/8),positionY:(windowHeight*11/12)},
        {nodeID:4,positionX:(windowWidth*5/8),positionY:(windowHeight*11/12)},
        {nodeID:5,positionX:(windowWidth*7/8),positionY:(windowHeight*11/12)},
        {nodeID:6,positionX:(windowWidth/8),positionY:(windowHeight*3/4)},
        {nodeID:7,positionX:(windowWidth*3/8),positionY:(windowHeight*3/4)},
        {nodeID:8,positionX:(windowWidth*5/8),positionY:(windowHeight*3/4)},
        {nodeID:9,positionX:(windowWidth*7/8),positionY:(windowHeight*3/4)},
        {nodeID:10,positionX:(windowWidth/8),positionY:(windowHeight*7/12)},
        {nodeID:11,positionX:(windowWidth*3/8),positionY:(windowHeight*7/12)},
        {nodeID:12,positionX:(windowWidth*5/8),positionY:(windowHeight*7/12)},
        {nodeID:13,positionX:(windowWidth*7/8),positionY:(windowHeight*7/12)},
        {nodeID:14,positionX:(windowWidth/8),positionY:(windowHeight*5/12)},
        {nodeID:15,positionX:(windowWidth*3/8),positionY:(windowHeight*5/12)},
        {nodeID:16,positionX:(windowWidth*5/8),positionY:(windowHeight*5/12)},
        {nodeID:17,positionX:(windowWidth*7/8),positionY:(windowHeight*5/12)},
        {nodeID:18,positionX:(windowWidth/8),positionY:(windowHeight/4)},
        {nodeID:19,positionX:(windowWidth*3/8),positionY:(windowHeight/4)},
        {nodeID:20,positionX:(windowWidth*5/8),positionY:(windowHeight/4)},
        {nodeID:21,positionX:(windowWidth*7/8),positionY:(windowHeight/4)},
        {nodeID:22,positionX:(windowWidth/8),positionY:(windowHeight/12)},
        {nodeID:23,positionX:(windowWidth*3/8),positionY:(windowHeight/12)},
        {nodeID:24,positionX:(windowWidth*5/8),positionY:(windowHeight/12)},
        {nodeID:25,positionX:(windowWidth*7/8),positionY:(windowHeight/12)},
]}
