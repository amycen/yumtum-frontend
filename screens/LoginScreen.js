import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon } from "react-native-elements";
import LoginForm from '../components/LoginForm';


class LoginScreen extends Component {

    componentDidUpdate() {
      if(this.props.userID){
        this.props.navigation.navigate('Dashboard')
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
                        height: '100%',
                        opacity: 0.75
                    }}
                    source={{ uri: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'}}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.container}>
                    <View style={styles.formContainer}>
                      <LoginForm />
                    </View>
                    <View style={styles.footer}>
                      <Text>Don't have an account?
                          <Text
                            style={styles.link}
                            onPress={() => this.props.navigation.navigate('Welcome')}>
                            Sigh Up Here! 
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  formContainer: {
    alignItems: 'stretch'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
      color: 'blue',
      textDecorationLine: 'underline'
  }

});

  