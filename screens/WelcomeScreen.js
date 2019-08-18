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
                    source={require('../assets/welcome.jpg')}
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
                            <Button title='LOGIN' onPress={()=>this.props.navigation.navigate('Discover')}/>
                          
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
        paddingBottom: 60
    },
    logo: {
        textAlign: 'center',
        fontSize: 60
    },
    sublogo: {
        textAlign: 'center',
        fontSize: 24,
        paddingBottom: 20
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    name: {
        flexDirection: 'row'
    }
})