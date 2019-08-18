import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, ListItem, Divider } from "react-native-elements";
import { connect } from "react-redux";
import {ORDER_NUM} from '../actions/constants'
import {getAllOrders} from '../actions/order'

class Profile extends Component {

  componentDidMount(){
    this.props.getAllOrders(this.props.userID)
  }

  renderAllOrders = () => {
    return this.props.allOrders.map(order => {
      return(
        <Fragment key={order.id}>
          <Text>Order #{ORDER_NUM + order.id}</Text>
          <Text>Total: {(order.subtotal + order.tax + order.tips).toFixed(2)}</Text>
          <Divider style={styles.divider}/>
        </Fragment>
      )
    })
  }

    render() {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Hi, {this.props.firstName}</Text>
            <Text type='semibold'>Previous Orders</Text>
            <ScrollView>
              {this.renderAllOrders()}
            </ScrollView>
            <Button title="SETTINGS" onPress={() => this.props.navigation.navigate("Settings")}>SETTINGS</Button>
          </View>
        );
      }
}

const msp = state => {
  return {
    firstName: state.user.firstName,
    userID: state.user.userID,
    allOrders: state.order.allOrders
  }
}

export default connect(msp, {getAllOrders})(Profile)

const styles = StyleSheet.create({
  divider: { 
    backgroundColor: 'black', 
    marginTop: 10, 
    marginBottom: 10 
  }
})