import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from '@expo/vector-icons/Feather'
import { createUser } from "../actions/user";

class CreateUserForm extends Component {
    state = { 
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordErrorMsg: ''
     }

    handleSubmit = () => {
        if (this.state.password === this.state.confirmPassword){
            let formData = {...this.state}
            this.props.createUser(formData)
            this.setState({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                passwordErrorMsg: ''
            })
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
                <Text>TESTING AREA: {this.props.errors}</Text>
                <View style={styles.name}>
                    <View>
                        <Input
                            containerStyle={{width: 210, marginBottom: 15}}
                            placeholder='First Name'
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChangeText={(firstName) => this.setState({firstName})}
                            value={this.state.firstName}
                            returnKeyType="next"
                            autoCorrect={false}
                            onSubmitEditing={() => this.lastNameInput.focus()}
                            />
                    </View>
                    <View>
                        <Input
                            containerStyle={{width: 200, marginBottom: 15}}
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
                    onChangeText={(phone) => this.setState({phone})}
                    containerStyle={{marginBottom: 15}}
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
                    onChangeText={(email) => this.setState({email})}
                    containerStyle={{marginBottom: 15}}
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
                    containerStyle={{marginBottom: 15}}
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
                    containerStyle={{marginBottom: 15}}
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
                <Text style={{color: 'red'}}>{this.props.errors}</Text>
                <TouchableOpacity> 
                    <Button containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800',}} title="Create Account" raised onPress={() => this.handleSubmit()} />
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
    }
})