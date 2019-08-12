import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon } from "react-native-elements";
import LoginForm from '../components/LoginForm';


class LoginScreen extends Component {
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
                      <Button title="Login" onPress={() => this.props.navigation.navigate('Dashboard')} />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const msp = state => {
    return state
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
  }

});

  