import React, { Component, Fragment } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import {connect} from 'react-redux'
import { setPrice } from "../actions/order";
import { Input, Divider, ButtonGroup, Button } from "react-native-elements";
import Text from '../components/CustomText'

getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

getETA = () => {
    return this.getRndInteger(1, 9) * 5
}

const ETA = this.getETA()

class Checkout extends Component {
    state = { 
        selectedTipsIndex: 1,
        customTips: ''
    }
    
    updateSelectTipIndex = (selectedTipsIndex) => {
        this.setState({selectedTipsIndex})
    }

    render() {
        const buttons = ['10%', '15%', '20%', 'Custom']
        const selectedTipsIndex = this.state.selectedTipsIndex
        const subtotal = this.props.selectedItem.price
        const tax = Math.round((subtotal * 0.0875) * 100) / 100
        const tips = selectedTipsIndex == 3 ? (parseFloat(this.state.customTips || '0')) : (Math.round(((0.10 + 0.05 * this.state.selectedTipsIndex) * subtotal)* 100) / 100)
        const total = Math.round((subtotal + tax + tips) * 100) / 100
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.orderInfo}>
                    <Text type='semibold' style={styles.title}>Order Summary</Text>
                    <View >
                        <View>
                            <Text type='semibold' style={styles.restaurantName}>{this.props.selectedItem.restaurant.name}</Text>
                        </View>
                        <View style={styles.address}>
                            <Text>{this.props.selectedItem.restaurant.street}</Text>
                            <Text>{this.props.selectedItem.restaurant.city}, {this.props.selectedItem.restaurant.state} {this.props.selectedItem.zip_code}</Text>
                        </View>
                        <Text>ETA {ETA} - {ETA + 5} minutes</Text>
                        <Divider style={styles.divider} />
                        <Text>{this.props.selectedItem.name}</Text>
                        <Text>Qty 1</Text>
                    </View>
                </View> 

                <View style={styles.payment}>
                    <Divider style={styles.divider} />
                    <View>
                        <Text>Tips</Text>
                        <ButtonGroup
                            onPress={this.updateSelectTipIndex}
                            selectedIndex={selectedTipsIndex}
                            textStyle={{fontFamily: 'comfortaa-regular'}}
                            buttons={buttons}
                            containerStyle={{height: 30}}
                            />
                        <Input 
                            keyboardType='numeric' 
                            placeholder='Enter Tip Amount' 
                            value={this.state.customTips}
                            inputStyle={{fontFamily: 'comfortaa-regular', fontSize: 14}}
                            onChangeText={(customTips) => {
                                this.setState({
                                    customTips: customTips,
                                    selectedTipsIndex: 3
                                })
                            }}
                        />
                    </View>

                    <Divider style={styles.divider} />
                    <View style={styles.subtotal}>
                        <View style={styles.costLine}>
                            <View style={{marginRight: 25}}>
                                <Text>Subtotal</Text>
                            </View>
                            <View style={{marginRight: 25}}>
                                <Text>Tax</Text>
                            </View>
                            <View style={{marginRight: 25}}>
                                <Text>Tips</Text>
                            </View>
                        </View>
                        <View style={styles.costLine}>
                            <View style={styles.prices}>
                                <Text style={{textAlign: 'right'}}> {subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.prices}>
                                <Text style={{textAlign: 'right'}}> {tax.toFixed(2)}</Text>
                            </View>
                            <View style={styles.prices}>
                                <Text style={{textAlign: 'right'}}> {tips.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={styles.divider} />
                    <View style={styles.subtotal}>
                        <View style={styles.costLine}>
                            <View style={{marginRight: 30}}>
                                <Text type='semibold' style={{fontSize: 18}}>Total</Text>
                            </View>
                        </View>
                        <View style={styles.costLine}>
                            <View style={styles.prices}>
                                <Text type='semibold' style={{fontSize: 18, textAlign: 'right'}}> {total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                <Button containerStyle={{marginTop: 30}} 
                    onPress={() => {
                        this.props.setPrice(subtotal, tax, tips)
                        this.props.navigation.navigate("Pay")}
                    } 
                    title="Checkout"
                    buttonStyle={{backgroundColor: '#1DA2FF'}}
                    titleStyle={{fontFamily: 'comfortaa-semibold', fontSize: 18}} 
                    containerStlye={{marginTop: "15", marginBottom: "10", fontWeight: '800',}} 
                />
                </View>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const msp = state => {
    return {
        selectedItem: state.item.selectedItem
    }
}
export default connect(msp, {setPrice})(Checkout)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    restaurantContainer: {
        flex: 1, 
        flexDirection: 'row'
    },
    restaurantName: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    address: {
        marginBottom: 10
    },
    divider: { 
        backgroundColor: 'black', 
        marginTop: 10, 
        marginBottom: 10 
    },
    payment: {
        top: 100
    },
    tips: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    subtotal: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    costLine: {
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    prices: {
        alignItems: 'flex-end'
    }
})