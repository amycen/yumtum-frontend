import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import {Input, Button} from 'react-native-elements'
import Icon from '@expo/vector-icons/FontAwesome5'
import CreateUserForm from '../components/CreateUserForm';
import {connect} from 'react-redux'
import {getAllItems} from '../actions/item'
import Text from '../components/CustomText'

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
                        width: '100%',
                        height: '100%'
                    }}
                    source={{ uri: 'https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'}}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            
                                <Text type='medium' style={styles.logo}>YUMTUM</Text>
                                <Text style={styles.sublogo}>Food At Your Fingertips</Text>
                           
                                <CreateUserForm />
                                <Text style={{marginTop: 30, marginBottom: 5}}>By creating an account, you agree to our <Text style={styles.link}>Terms</Text></Text>
                                    <Text>Already have an account?<Text
                                        style={styles.link}
                                        onPress={() => this.props.navigation.navigate('Login')}>
                                        Log In
                                    </Text>
                                </Text>
                            <Button
                                titleStyle={{fontFamily: 'comfortaa-semibold'}}
                                    onPress={() => this.props.navigation.navigate('Profile')}
                                    title="Log In" />
                          
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
        justifyContent: 'center',
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