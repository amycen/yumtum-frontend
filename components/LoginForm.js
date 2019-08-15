import React, { Component } from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from "react-native";
import { Input, Button } from "react-native-elements";
import { login } from "../actions/user";

class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange(text, field){
        if(field === 'username'){
            this.setState({username: text})
        }
        else if(field === 'password'){
            this.setState({password: text})
        }
    }

    handleSubmit(){
        let formData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(formData)
        this.setState({
            username: '',
            password: ''
        })
    }
    render() {
        return (
                <View style={styles.container} >
                    <TextInput 
                        style={styles.input}
                        placeholder='username'
                        placeholderTextColor="#575757"
                        returnKeyType="next"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(text) => this.handleChange(text, 'username')}
                        />
                    <TextInput 
                        style={styles.input}
                        placeholder='password' 
                        placeholderTextColor="#575757"
                        secureTextEntry
                        returnKeyType="go"
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(text) => this.handleChange(text, 'password')}
                    />
                    <TouchableOpacity> 
                        <Button containerStyle={styles.btnContainer} title="Login" raised onPress={() => this.handleSubmit()}/>
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
        padding: 30
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
        width: "50%",
        alignSelf: 'center'
    }
})