import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5'

import {MultiBar, MultiBarToggle} from 'react-native-multibar';

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Detail from "./screens/Detail"
import SignUpScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen"; 
import Profile from "./screens/Profile";  
import Discover from "./screens/Discover"; 
import FeelingLucky from "./screens/FeelingLucky"; 
import HopOnIt from "./screens/HopOnIt"; 
import Settings from "./screens/Settings"
import Checkout from "./screens/Checkout"
import Pay from "./screens/Pay"

import {createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import { Provider, connect } from "react-redux"
import { createUser } from './actions/user';
import store from './store/store'


class App extends Component {

  state = {
    username: ''
  }

  createUserSubmitHandler = () => {
    alert("SUBMITTED USER")
  }

  createUserChangeHandler = username => {
    this.setState({
      username: username
    })
  }

  render(){
    return (
        <Provider store={store}>
          <AppContainer />
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
    Pay: { screen: Pay}
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
      activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      showLabel: false,
      style: {
        backgroundColor: '#171F33'
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
        style={{paddingLeft: 10}}
        onPress={() => navigation.openDrawer()}
      />
    }
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
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