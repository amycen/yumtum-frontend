import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from '@expo/vector-icons/Feather'
import { createUser } from "../actions/user"
import Text from './CustomText';

class CreateUserForm extends Component {
    state = { 
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordErrorMsg: '',
        errorMessage: ''
     }

    handleSubmit = () => {
        if (this.state.firstName === ''){
            this.setState({
                errorMessage: 'Please enter all fields.'
            }, () => {
                this.firstNameInput.shake()
            })
        }
        else if (this.state.password === this.state.confirmPassword){
            let formData = {...this.state}
            this.props.createUser(formData)
        }
        else {
            this.setState({
                passwordErrorMsg: "Passwords Do Not Match"
            }, () => {
                this.passwordInput.shake()
                this.passwordConfirmInput.shake()
            })
        }
    }

    render() {
        return (
            <Fragment>
                <View style={styles.name}>
                    <View>
                        <Input
                            containerStyle={{width: 210, marginBottom: 15, paddingLeft: 30, paddingRight: 20}}
                            inputStyle={{paddingLeft: 10}}
                            placeholder='First Name'
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                    color='black'
                                    />
                            }
                            onChangeText={(firstName) => this.setState({firstName})}
                            ref={(input) => this.firstNameInput = input}
                            value={this.state.firstName}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.lastNameInput.focus()}
                            />
                    </View>
                    <View>
                        <Input
                            inputStyle={{paddingLeft: 5}}
                            containerStyle={{width: 200, marginBottom: 15, paddingRight: 30}}
                            placeholder='Last Name'
                            onChangeText={(lastName) => this.setState({lastName})}
                            ref={(input) => this.lastNameInput = input}
                            value={this.state.lastName}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.phoneInput.focus()}
                            />
                    </View>
                </View>

                <Input
                    inputStyle={{paddingLeft: 10}}
                    onChangeText={(phone) => this.setState({phone})}
                    containerStyle={styles.inputContainer}
                    placeholder='Phone'
                    leftIcon={
                        <Icon
                        name='phone'
                        size={24}
                        color='black'
                        />
                    }
                    ref={(input) => this.phoneInput = input}
                    value={this.state.phone}
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => this.emailInput.focus()}
                    keyboardType='numeric'
                />
                <Input
                    inputStyle={{paddingLeft: 10}}
                    onChangeText={(email) => this.setState({email})}
                    containerStyle={styles.inputContainer}
                    placeholder='Email'
                    leftIcon={
                        <Icon
                        name='mail'
                        size={24}
                        color='black'
                        />
                    }
                    ref={(input) => this.emailInput = input}
                    value={this.state.email}
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    />
                <Input
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
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordConfirmInput.focus()}
                    secureTextEntry
                    errorStyle={{color: 'red'}}
                    errorMessage={this.state.passwordErrorMsg}
                    secureTextEntry
                    />
                <Input
                    inputStyle={{paddingLeft: 10}}
                    containerStyle={styles.inputContainer}
                    placeholder='Confirm Password'
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                    errorStyle={{color: 'red'}}
                    errorMessage={this.state.passwordErrorMsg}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    ref={(input) => this.passwordConfirmInput = input}
                    value={this.state.passwordConfirmInput}
                    returnKeyType="go"
                    autoCorrect={false}
                    secureTextEntry
                    />
                <Text style={{color: 'red'}}>{this.state.errorMessage || this.props.errors}</Text>
                <TouchableOpacity> 
                    <Button titleStyle={{fontFamily: 'comfortaa-semibold'}} containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800',}} title="Create Account" raised onPress={() => this.handleSubmit()} />
                </TouchableOpacity>
            </Fragment>
        );
    }
}

const msp = (state) => {
    return {
        errors: state.user.errors
    }
}

export default connect(msp, {createUser})(CreateUserForm)

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
    },
    inputContainer: {
        marginBottom: 15, 
        paddingLeft: 30, 
        paddingRight: 30
    }
})