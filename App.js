import {TouchableOpacity} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "./app/Config/Colors";
import SignInScreen from "./app/screens/SignInScreen";
import MainScreen from "./app/screens/MainScreen";
import ResetPasswordScreen from "./app/screens/ResetPasswordScreen";
import SignUpNavigatorScreen from "./app/screens/SignUpNavigatorScreen";
import SignUpCustomerScreen from "./app/screens/SignUpCustomerScreen";
import SignUpEmployeeScreen from "./app/screens/SignUpEmployeeScreen";
import SignUpVerificationScreen from "./app/screens/SignUpVerificationScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ProductsByCategoryScreen from "./app/screens/ProductsByCategoryScreen";
import HelpScreen from "./app/screens/HelpScreen";
import ChangePasswordScreen from "./app/screens/ChangePasswordScreen";
import FiltersScreen from "./app/screens/FiltersScreen";
import ShoppingPathScreen from "./app/screens/ShoppingPathScreen";
import ProductDetailsScreen from "./app/screens/ProductDetailsScreen";
import ProductListScreen from "./app/screens/ProductListScreen";
import ShoppingPathForListScreen from "./app/screens/ShoppingPathForListScreen";
import ProductSearchScreen from "./app/screens/ProductSearchScreen";
import UpdateProductEmployeeScreen from "./app/screens/UpdateProductEmployeeScreen";
import EmployeeProfileScreen from "./app/screens/EmployeeProfileScreen";
import QRNavigatorScreen from "./app/screens/QRNavigatorScreen";
import QRScreen from "./app/screens/QRScreen";
import ProductDetailByQRScreen from "./app/screens/ProductDetailByQRScreen";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import Ble from "./app/screens/Ble";
import {useEffect} from "react";
const Stack = createNativeStackNavigator();

const MainPageStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="MainScreen" navigation={{goBack:false}}
            options={{
                headerBackVisible:false,
                title: 'SESA' ,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: Colors.standartColor,
                },
                headerTintColor: '#fff',
            }} component={MainScreen}
        />
    </Stack.Navigator>
);
const QRNavigatorStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="QRNavigatorScreen" navigation={{goBack:false}}
                      options={{
                          headerBackVisible:false,
                          title: 'QR Scanner' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                      }} component={QRNavigatorScreen}
        />
    </Stack.Navigator>
);
const ProfileStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ProfileScreen"
                      options={{
                          title: 'My Profile' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("MainScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ProfileScreen}
        />
    </Stack.Navigator>
);

const EmployeeProfileStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="EmployeeProfileScreen"
                      options={{
                          title: 'My Profile' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("UpdateProductEmployeeScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={EmployeeProfileScreen}
        />
    </Stack.Navigator>
);
const ProductListStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ProductListScreen"
                      options={{
                          title: 'Product List' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerBackVisible:false,
                      }} component={ProductListScreen}
        />
    </Stack.Navigator>
);

const ProductSearchStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ProductSearchScreen"
                      options={{
                          title: 'Products' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerBackVisible:false,
                      }} component={ProductSearchScreen}
        />
    </Stack.Navigator>
);
const ProductsByCategoryStackScreen = ({ navigation }) => (

    <Stack.Navigator>
        <Stack.Screen name="ProductsByCategoryScreen"
                      options={{
                          title: 'Products' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("MainScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ProductsByCategoryScreen}
        />
    </Stack.Navigator>
);

const QRStackScreen = ({ navigation }) => (

    <Stack.Navigator>
        <Stack.Screen name="QRScreen"
                      options={{
                          title: 'QR' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {
                                      navigation.navigate("QRNavigatorScreen");
                                  }} >
                                  <Icon style = {{paddingLeft : 10}} name="close" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }}
                      component={QRScreen}
        />
    </Stack.Navigator>
);
const HelpStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="HelpScreen"
                      options={{
                          title: 'Help' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("ProfileScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={HelpScreen}
        />
    </Stack.Navigator>
);
const ChangePasswordStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ChangePasswordScreen"
                      options={{
                          title: 'Change Password' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("ProfileScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ChangePasswordScreen}
        />
    </Stack.Navigator>
);
const FiltersStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="FiltersScreen"
                      options={{
                          title: 'My Filters' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("ProfileScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={FiltersScreen}
        />
    </Stack.Navigator>
);
const ShoppingPathStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ShoppingPathScreen"
                      options={{
                          title: 'Shopping Path' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.goBack()}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ShoppingPathScreen}
        />
    </Stack.Navigator>
);
const ShoppingPathForListStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ShoppingPathForListScreen"
                      options={{
                          title: 'Shopping Path For List' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {navigation.navigate("ProductListScreen")}}>
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ShoppingPathForListScreen}
        />
    </Stack.Navigator>
);
const ProductDetailsStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ProductDetailsScreen"
                      options={{
                          title: 'Product Detail' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {
                                      navigation.goBack()
                                  }} >
                                  <Icon style = {{paddingLeft : 10}} name="arrow-left" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ProductDetailsScreen}
        />

    </Stack.Navigator>
);
const ProductDetailByQRStackScreen = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen name="ProductDetailByQRScreen"
                      options={{
                          title: 'Product Detail' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                          headerLeft: () => (
                              <TouchableOpacity
                                  onPress={() => {
                                      navigation.navigate("QRNavigatorScreen")
                                  }} >
                                  <Icon style = {{paddingLeft : 10}} name="close" size={26} color="#fff" />
                              </TouchableOpacity>

                          ),
                      }} component={ProductDetailByQRScreen}
        />

    </Stack.Navigator>
);
const UpdateProductEmployeeStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="UpdateProductEmployeeScreen" navigation={{goBack:false}}
                      options={{
                          headerBackVisible:false,
                          title: 'Update Product' ,
                          headerTitleAlign: 'center',
                          headerStyle: {
                              backgroundColor: Colors.standartColor,
                          },
                          headerTintColor: '#fff',
                      }} component={UpdateProductEmployeeScreen}
        />
    </Stack.Navigator>
);
const Tab = createBottomTabNavigator();
function AppTabsScreen(){
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: Colors.standartColor,
            tabBarInactiveTintColor: 'gray',
        }} initialRouteName="Home">
            <Tab.Screen name="Home" component={MainPageStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="home" size={props.size} color={props.color} />
                ),
                headerShown: false}}
                        />

            <Tab.Screen name="Search" component={ProductSearchStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="magnify" size={props.size} color={props.color} />
                ),
                headerShown: false,unmountOnBlur: true}}
                        listeners={({ navigation }) => ({
                            blur: () => navigation.setParams({ screen: undefined }),
                        })}/>

            <Tab.Screen name="Scan QR" component={QRNavigatorStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="qrcode" size={props.size} color={props.color} />
                ),
                headerShown: false,unmountOnBlur: true}}
                        listeners={({ navigation }) => ({
                            blur: () => navigation.setParams({ screen: undefined }),
                        })}/>

            <Tab.Screen name="Product List" component={ProductListStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="clipboard-list" size={props.size} color={props.color} />
                ),
                headerShown: false,unmountOnBlur: true}}
                        listeners={({ navigation }) => ({
                            blur: () => navigation.setParams({ screen: undefined }),
                        })}/>
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="account" size={props.size} color={props.color} />
                ),
                headerShown: false}}
                        />

        </Tab.Navigator>
    );
}

const TabForEmployee = createBottomTabNavigator();
function AppTabsForEmployeeScreen(){
    return(
        <TabForEmployee.Navigator screenOptions={{
            tabBarActiveTintColor: Colors.standartColor,
            tabBarInactiveTintColor: 'gray',
        }} initialRouteName="Update Product">
            <TabForEmployee.Screen name="Update Product" component={UpdateProductEmployeeStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="find-replace" size={props.size} color={props.color} />
                ),
                headerShown: false,unmountOnBlur: true}}
                listeners={({ navigation }) => ({
                    blur: () => navigation.setParams({ screen: undefined }),
                })}
            />
            <TabForEmployee.Screen name="Profile" component={EmployeeProfileStackScreen} options={{
                tabBarIcon: (props) => (
                    <Icon name="account" size={props.size} color={props.color} />
                ),
                headerShown: false}}
            />

        </TabForEmployee.Navigator>
    );
}

export default function App ({navigation}) {
  return (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="SignInScreen" options={{headerShown: false}} component={SignInScreen}/>
                  <Stack.Screen name="SignUpNavigatorScreen" options={{headerShown: false}} component={SignUpNavigatorScreen} />
                  <Stack.Screen name="SignUpCustomerScreen" options={{headerShown: false}} component={SignUpCustomerScreen} />
                  <Stack.Screen name="SignUpEmployeeScreen" options={{headerShown: false}} component={SignUpEmployeeScreen} />
                  <Stack.Screen name="SignUpVerificationScreen" options={{headerShown: false}} component={SignUpVerificationScreen} />
                  <Stack.Screen name="ResetPasswordScreen" options={{headerShown: false}} component={ResetPasswordScreen} />
                  <Stack.Screen name="ProductByCategoryScreen" options={{headerShown: false}} component={ProductsByCategoryStackScreen} />
                  <Stack.Screen name="HelpScreen" options={{headerShown: false}} component={HelpStackScreen} />
                  <Stack.Screen name="ChangePasswordScreen" options={{headerShown: false}} component={ChangePasswordStackScreen} />
                  <Stack.Screen name="FiltersScreen" options={{headerShown: false}} component={FiltersStackScreen} />
                  <Stack.Screen name="ShoppingPathScreen" options={{headerShown: false}} component={ShoppingPathStackScreen} />
                  <Stack.Screen name="ProductDetailsScreen" options={{headerShown: false}} component={ProductDetailsStackScreen} />
                  <Stack.Screen name="ShoppingPathForListScreen" options={{headerShown: false}} component={ShoppingPathForListStackScreen} />
                  <Stack.Screen name="QRScreen" options={{headerShown: false}} component={QRStackScreen} />
                  <Stack.Screen name="ProductDetailByQRScreen" options={{headerShown: false}} component={ProductDetailByQRStackScreen} />
                  <Stack.Screen name="AppTabsScreen" component={AppTabsScreen} />
                  <Stack.Screen name="AppTabsForEmployeeScreen" component={AppTabsForEmployeeScreen} />
              </Stack.Navigator>
          </NavigationContainer>
  );
};
