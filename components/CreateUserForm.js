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
        firstNameErr: '',
        lastNameErr: '',
        phoneErr: '',
        emailErr: '',
        passwordErr: ''
     }

    handleSubmit = () => {
        if (this.state.firstName === ''){
            this.setState({
                firstNameErr: 'Please enter first name'
            }, () => {
                this.firstNameInput.shake()
                
            })
        }
        else if (this.state.lastName === ''){
            this.setState({
                lastNameErr: 'Please enter last name'
            }, () => {
                this.lastNameInput.shake()
            })
        }
        else if (this.state.phone === ''){
            this.setState({
                phoneErr: 'Please enter phone number'
            }, () => {
                this.phoneInput.shake()
            })
        }
        else if (this.state.email === ''){
            this.setState({
                emailErr: 'Please enter email address'
            }, () => {
                this.emailInput.shake()
            })
        }
        else if (this.state.password === ''){
            this.setState({
                passwordErr: 'Please enter password'
            }, () => {
                this.passwordInput.shake()
            })
        }
        else if (this.state.password === this.state.confirmPassword){
            let formData = {...this.state}
            this.props.createUser(formData)
        }
        else {
            this.setState({
                passwordErr: "Passwords Do Not Match"
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
                            onChangeText={(firstName) => this.setState({
                                firstName: firstName,
                                firstNameErr: ''
                            })}
                            ref={(input) => this.firstNameInput = input}
                            value={this.state.firstName}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.lastNameInput.focus()}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.firstNameErr}
                            />
                    </View>
                    <View>
                        <Input
                            inputStyle={{paddingLeft: 5}}
                            containerStyle={{width: 200, marginBottom: 15, paddingRight: 30}}
                            placeholder='Last Name'
                            onChangeText={(lastName) => this.setState({
                                lastName: lastName,
                                lastNameErr: ''
                            })}
                            ref={(input) => this.lastNameInput = input}
                            value={this.state.lastName}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.phoneInput.focus()}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.lastNameErr}
                            />
                    </View>
                </View>

                <Input
                    inputStyle={{paddingLeft: 10}}
                    onChangeText={(phone) => this.setState({
                        phone: phone,
                        phoneErr: ''
                    })}
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
                    errorStyle={{color: 'red'}}
                    errorMessage={this.state.phoneErr}
                />
                <Input
                    inputStyle={{paddingLeft: 10}}
                    onChangeText={(email) => this.setState({
                        email: email,
                        emailErr: ''
                    })}
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
                    errorStyle={{color: 'red'}}
                    errorMessage={this.state.emailErr}
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
                    onChangeText={(password) => this.setState({
                        password: password
                    })}
                    ref={(input) => this.passwordInput = input}
                    value={this.state.password}
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordConfirmInput.focus()}
                    secureTextEntry
                    errorStyle={{color: 'red'}}
                    errorMessage={this.state.passwordErr}
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
                    errorMessage={this.state.passwordErr}
                    onChangeText={(confirmPassword) => this.setState({
                        confirmPassword: confirmPassword,
                        passwordErr: ''
                    })}
                    ref={(input) => this.passwordConfirmInput = input}
                    value={this.state.passwordConfirmInput}
                    returnKeyType="go"
                    autoCorrect={false}
                    secureTextEntry
                    />
                <Text style={{color: 'red'}}>{this.state.errorMessage || this.props.errors}</Text>
                <TouchableOpacity> 
                    <Button buttonStyle={{backgroundColor: '#1DA2FF'}}titleStyle={{fontFamily: 'comfortaa-semibold', fontSize: 18}} containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800',}} title="Create Account" raised onPress={() => this.handleSubmit()} />
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