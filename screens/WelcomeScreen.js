import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import {Input, Button} from 'react-native-elements'
import Icon from '@expo/vector-icons/FontAwesome5'
import CreateUserForm from '../components/CreateUserForm';
import {connect} from 'react-redux'
import {getAllItems} from '../actions/item'

class WelcomeScreen extends Component {

    componentDidMount() {
        this.props.getAllItems()
    }
    
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
                        height: '100%',
                        opacity: 0.75
                    }}
                    source={{ uri: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'}}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <Text style={styles.logo}>YUMTUM</Text>
                            <Text style={styles.sublogo}>Food At Your Fingertips</Text>
                            <CreateUserForm />
                            <Text style={{marginTop: 30}}>By creating an account, you agree to our <Text style={styles.link}>Terms</Text></Text>
                                <Text>Already have an account?<Text
                                    style={styles.link}
                                    onPress={() => this.props.navigation.navigate('Login')}>
                                    Log In
                                </Text>
                            </Text>
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

export default connect(msp, {getAllItems})(WelcomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        textAlign: 'center',
        fontSize: 60
    },
    sublogo: {
        textAlign: 'center',
        fontSize: 24
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    name: {
        flexDirection: 'row'
    }
})