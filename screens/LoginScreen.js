import React, { Component } from 'react';
import { View, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon } from "react-native-elements";
import LoginForm from '../components/LoginForm';
import Text from '../components/CustomText'


class LoginScreen extends Component {

    componentDidUpdate() {
      if(this.props.userID){
        this.props.navigation.navigate('Discover')
      }
    }
    render() {
        return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <ImageBackground 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                    source={ require('../assets/login.jpg')}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.container}>
                    <View style={styles.welcome}>

                    <Text type='semibold' style={{fontSize: 30, marginBottom: 5}}>We Missed You</Text>
                    <Text type='semibold'style={{fontSize: 24}}>Let's Get You Some Food!</Text>
                    </View>
                    <View style={styles.formContainer}>
                      <LoginForm />
                    </View>
                    <View style={styles.footer}>
                      <Text>Don't have an account?
                          <Text
                            style={styles.link}
                            onPress={() => this.props.navigation.navigate('Welcome')}>
                            Sign Up Here! 
                          </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const msp = state => {
    return {
      userID: state.user.userID
    }
}

/* const mdp = dispatch => {
    return {
        addUser: () => {dispatch(createUser("I AM NEW USER HI"))}
    }
} */

export default connect(msp, {createUser})(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
      marginTop: 100,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: 25,
      height: 200,
    },  
  formContainer: {
    marginBottom: 20,
    alignItems: 'stretch',
  },
  footer: {
    marginTop: 165,
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
      color: 'blue',
      textDecorationLine: 'underline'
  }

});

  