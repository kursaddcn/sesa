import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try{
        await AsyncStorage.setItem('category',value)
    }
    catch (e){

    }
}
export default function MainScreen({navigation}) {
    return (
            <View style={styles.container}>
                <Text>Categories</Text>
                <View style={styles.boxContainer}>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Beverages");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/beverage.jpg')}
                        />
                        <Text style={styles.textStyle}>Beverages</Text >
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Snack");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/snack.jpg')}
                        />
                        <Text style={styles.textStyle}>Snack</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Frozen Foods");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/frozen.jpg')}
                        />
                        <Text style={styles.textStyle}>Frozen Foods</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Dairy Products");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/dairy.png')}
                        />
                        <Text style={styles.textStyle}>Dairy Products</Text>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Fruit & Vegetable");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/fruitsAndVegetables.jpg')}
                        />
                        <Text style={styles.textStyle}>Fruit & Vegetable</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Bread & Bakery");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/bread.jpg')}
                        />
                        <Text style={styles.textStyle}>Bread & Bakery</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Staple Food");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/rice.jpg')}
                        />
                        <Text style={styles.textStyle}>Staple Food</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Breakfast & Cereal");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/breakfast.jpg')}
                        />
                        <Text style={styles.textStyle}>Breakfast & Cereal</Text>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Food");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/food.jpg')}
                        />
                        <Text style={styles.textStyle}>Food</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Canned Goods");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/cannedGoods.png')}
                        />
                        <Text style={styles.textStyle}>Canned Goods</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Legumes & Pasta");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/grains.jpg')}
                        />
                        <Text style={styles.textStyle}>Legumes & Pasta</Text>
                    </View>
                        <View style={styles.box} onStartShouldSetResponder={() => {storeData("Meat & Seafood");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/meat.jpg')}
                        />
                        <Text style={styles.textStyle}>Meat & Seafood</Text>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Paper Products");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/toiletPaper.jpg')}
                        />
                        <Text style={styles.textStyle}>Paper Products</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Cleaning Supplies");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/cleaning.jpg')}
                        />
                        <Text style={styles.textStyle}>Cleaning Supplies</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Personal Care");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/personalCare.png')}
                        />
                        <Text style={styles.textStyle}>Personal Care</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Pet Care");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/petCare.jpg')}
                        />
                        <Text style={styles.textStyle}>Pet Care</Text>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Baby");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/baby.jpg')}
                        />
                        <Text style={styles.textStyle}>Baby</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Home");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/home.jpg')}
                        />
                        <Text style={styles.textStyle}>Home</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Technology");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/tech.jpeg')}
                        />
                        <Text style={styles.textStyle}>Technology</Text>
                    </View>
                    <View style={styles.box} onStartShouldSetResponder={() => {storeData("Sexual Health");
                        navigation.navigate('ProductByCategoryScreen')}}>
                        <Image
                            style={styles.img}
                            source={require('../assets/sexualHealth.png')}
                        />
                        <Text style={styles.textStyle}>Sexual Health</Text>
                    </View>
                </View>
            </View>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    boxContainer: {
        flex:1,
        flexDirection: "row",
    },
    box: {
        flex:1,
        margin:10,
    },
    img: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,

    },
    textStyle: {
        fontSize:12,
    },
});
