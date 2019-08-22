import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {connect} from 'react-redux'
import { Button } from "react-native-elements";
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
                    <View style={{marginBottom: 20}}>
                    <Text type='semibold' style={styles.title}>You Are All Set</Text>
                    <Text style={styles.text}>Order #{ORDER_NUM + this.props.order.id}</Text>
                    <Text style={styles.text}>{this.props.lastOrderItem.name}</Text>
                    <Text style={styles.text}>Total: ${this.orderTotal().toFixed(2)}</Text>
                    <Text style={styles.text}>Status: Order Received</Text>
                    </View>
                    <Button title="Back to Profiles"
                        buttonStyle={{backgroundColor: '#1DA2FF'}}
                        titleStyle={{fontFamily: 'comfortaa-semibold', fontSize: 18}} 
                        containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800',}} 
                        onPress={() => this.props.navigation.navigate('Profile')}
                    />
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
    },
    title: {
        fontSize: 28,
        marginTop: 25,
        marginBottom: 8,
    },
    text: {
        fontSize: 18
    }
})