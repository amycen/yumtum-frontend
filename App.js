import React, {Component} from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5'

import {MultiBar, MultiBarToggle} from 'react-native-multibar';

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Detail from "./screens/Detail"
import DashboardScreen from "./screens/DashboardScreen"; 
import Profile from "./screens/Profile";  
import Discover from "./screens/Discover"; 
import FeelingLucky from "./screens/FeelingLucky"; 
import HopOnIt from "./screens/HopOnIt"; 
import Settings from "./screens/Settings"
import Checkout from "./screens/Checkout"
import Pay from "./screens/Pay"
import OrderStatus from "./screens/OrderStatus"

import {createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import { Provider, connect } from "react-redux"
import { createUser } from './actions/user';
import store from './store/store'
import * as Font from 'expo-font'

class App extends Component {

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
      'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
      'comfortaa-light': require('./assets/fonts/Comfortaa-Light.ttf'),
      'comfortaa-medium': require('./assets/fonts/Comfortaa-Medium.ttf'),
      'comfortaa-semibold': require('./assets/fonts/Comfortaa-SemiBold.ttf'),
    })
    this.setState({fontLoaded: true})
  }

  render(){
    return (
        <Provider store={store}>
          {this.state.fontLoaded ? (<AppContainer />) : 
            (
              <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            )}
        </Provider>
    )
  }
}


const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: "Discover",
        headerLeft: 
          <Icon name="bars" size={30} style={{paddingLeft: 10}} onPress={() => navigation.openDrawer()}/>
    }
    }
  },
  Detail: {
    screen: Detail
  }
},{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: "Profile",
        headerLeft: 
          <Icon name="bars" size={30} style={{paddingLeft: 10}} onPress={() => navigation.openDrawer()}/>
    }
    }
  },
  Settings: {
    screen: Settings
  }
},{
  defaultNavigationOptions: {
    gesturesEnabled: false
  }
})

const CheckoutStackNavigator = createStackNavigator({
    Checkout: {
      screen: Checkout,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: "Checkout",
          headerLeft: 
            <Icon name="chevron-left" size={30} style={{paddingLeft: 10}} onPress={() => navigation.navigate('Discover')}/>
      }
      }
    },
    Pay: { screen: Pay},
    OrderStatus: {screen: OrderStatus}
  },{
    defaultNavigationOptions: {gesturesEnabled: false}
  })

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="user"
            color={tintColor}
            size={22}
          />
        )
      })
    },
    MultiBar: {
      screen: () => null,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <MultiBarToggle
            navigation={navigation}
            actionSize={30}
            routes={[
              {
                routeName: 'FeelingLucky',
                color: '#FF8360',
                icon: (
                  <Icon
                    name="dice"
                    color="#333333"
                    size={15}
                  />
                )
              },
              {
                routeName: 'Discover',
                color: '#E8E288',
                icon: (
                  <Icon
                    name="rocket"
                    color="#333333"
                    size={15}
                  />
                )
              },
              {
                routeName: 'HopOnIt',
                color: '#7DCE82',
                icon: (
                  <Icon
                    name="hands-helping"
                    color="#333333"
                    size={15}
                  />
                )
              }
            ]}
            icon={(
              <Icon
                name="plus"
                color="#FFF"
                size={24}
              />
            )}
          />
        )
      }),
      params: {
        navigationDisabled: true
      }
    },
    Discover: {
      screen: DiscoverStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="hamburger"
            color={tintColor}
            size={24}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Discover',
    paths: {
      FeelingLucky: FeelingLucky,
      HopOnIt: HopOnIt
    },
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index]
      return {
        header: null,
        headerTitle: routeName
      }
    },
    tabBarComponent: MultiBar,
    tabBarOptions: {
      activeTintColor: '#1DA2FF',
      inactiveTintColor: '#ABABAB',
      showLabel: false,
      style: {
        backgroundColor: '#F2F2F2'
      }
    }
  }
)

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
},
{
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerLeft: <Icon 
        name="bars" 
        size={30} 
        style={{paddingLeft: 10, color: "#1DA2FF"}}
        onPress={() => navigation.openDrawer()}
      />
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: DashboardStackNavigator
  },
  Discover: {
    screen: Discover
  },
  Profile: {
    screen: ProfileStack
  },
  Settings:{
    screen: Settings
  },
  Logout: {
    screen: LoginScreen
  },
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: WelcomeScreen},
  Dashboard: {screen: AppDrawerNavigator},
  Login: {screen: LoginScreen},
  Checkout: {screen: CheckoutStackNavigator}
})

const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App