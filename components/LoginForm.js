import React, { Component } from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import { login } from "../actions/user";
import Icon from '@expo/vector-icons/Feather'
import Text from './CustomText'

class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    }
    
    handleSubmit(){
        let formData = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({
            email: '',
            password: ''
        }, () => {this.props.login(formData)})
    }

    render() {
        return (
                <View style={styles.container} >
                    <Input 
                        inputStyle={{paddingLeft: 10}}
                        inputContainerStyle={{backgroundColor: 'white', opacity: 0.8,}}
                        onChangeText={(email) => this.setState({email})}
                        containerStyle={styles.inputContainer}
                        placeholder='Email'
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='black'
                            />
                        }
                        ref={(input) => this.emailInput = input}
                        value={this.state.email}
                        returnKeyType="next"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <Input 
                        inputContainerStyle={{backgroundColor: 'white', opacity: 0.8}}
                        inputStyle={{paddingLeft: 10}}
                        containerStyle={styles.inputContainer}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='black'
                            />
                        }
                        onChangeText={(password) => this.setState({password})}
                        ref={(input) => this.passwordInput = input}
                        value={this.state.password}
                        returnKeyType="go"
                        autoCorrect={false}
                        secureTextEntry
                    />
                    {this.props.errors ? (<Text style={styles.error}>{this.props.errors}</Text>) : null}
                    <TouchableOpacity> 
                        <Button buttonStyle={{backgroundColor: '#1DA2FF'}}titleStyle={{fontFamily: 'comfortaa-semibold'}} containerStyle={styles.btnContainer} title="Login" raised 
                        onPress={() => {
                            this.emailInput.focus()
                            this.handleSubmit()
                        }}
                    />
                    </TouchableOpacity>
                </View>
        );
    }
}

const msp = (state) => {
    return {
        errors: state.user.errors
    }
}


export default connect(msp, {login})(LoginForm)

const styles = StyleSheet.create({
    container: {
    },
    input: {
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        marginTop: 15,
        width: "50%",
        alignSelf: 'center'
    },
    inputContainer: {
        marginBottom: 15, 
        paddingLeft: 30, 
        paddingRight: 30
    },
    error: {
        textAlign: 'center',
        color: 'red'
    }
})