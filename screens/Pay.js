import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { createUser } from "../actions/user";
import { Input, Icon } from "react-native-elements";
import LoginForm from '../components/LoginForm';

class Pay extends Component {
    state = {  }
    render() {
        return (
            <Text>PAY</Text>
        );
    }
}

export default Pay;