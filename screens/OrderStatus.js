import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import { Input, Icon, Divider, ButtonGroup, Button } from "react-native-elements";
import Text from '../components/CustomText'
import {ORDER_NUM} from '../actions/constants'

class OrderStatus extends Component {
    
    orderTotal = () => {
        return this.props.order.subtotal + this.props.order.tax + this.props.order.tips
    }

    render() {
        return (
            <View style={styles.container}>
            {this.props.lastOrderItem ?
                (<Fragment>
                    <Text type='semibold'>Food is on the way!</Text>
                    <Text>Order #{ORDER_NUM + this.props.order.id}</Text>
                    <Text>Total: ${this.orderTotal().toFixed(2)}</Text>
                    <Text>Status: {this.props.order.status}</Text>
                    <Button title="GO BACK TO PROFILE" onPress={() => this.props.navigation.navigate('Profile')}/>
                </Fragment>)
                    : <ActivityIndicator size="large" color="#0000ff"/>
                }
                </View>
        );
    }
}

const msp = state => {
    return {
        selectedItem: state.item.selectedItem,
        lastOrderItem: state.order.lastOrderItem,
        order: state.order.lastOrderItem.order
    }
}
export default connect(msp)(OrderStatus)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})