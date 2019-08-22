import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Divider } from "react-native-elements";
import { connect } from "react-redux";
import {ORDER_NUM} from '../actions/constants'
import {getAllOrders} from '../actions/order'
import Icon from '@expo/vector-icons/Feather'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Image } from 'react-native-elements';

class Profile extends Component {

  componentDidMount(){
    this.props.getAllOrders(this.props.userID)
  }

  renderAllOrders = () => {
    return this.props.allOrders.map(order => {
      return(
        <View key={order.id} style={{paddingHorizontal: 30}}>
          <Divider style={styles.divider}/>
          <View style={{flexDirection: 'row', paddingLeft: 58}}>
            <View>
              <Image source={{uri: order.items[0].image}} PlaceholderContent={<ActivityIndicator />} style={styles.image} />
            </View>
            <View style={{paddingLeft: 20, textAlign: 'left'}}>
              <Text>Order #{ORDER_NUM + order.id}</Text>
              <Text>{order.restaurant.name}</Text>
              <Text>Total: ${(order.subtotal + order.tax + order.tips).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      )
    }).reverse()
  }

  renderItemList = items => {
    return items.map(item => {
      return(
        item.name
      )
    })
  }
  
  renderLastActiveOrder = () => {
    const lastOrder = this.props.allOrders.slice(-1)[0]
    if(lastOrder.status !== 'COMPLETED'){
      return(
        <View style={{flex: 1}}>
          <View style={{ alignItems: 'center'}}>
          <Text type='semibold' style={styles.subheader}>{this.renderItemList(lastOrder.items)} is on its way!</Text>
          <View style={styles.info}>
          <Icon name='clock' size={20}/>
          <Text style={styles.restText}>Remaining ETA {10} mins</Text>
          </View>
          </View>
          <Divider style={styles.divider}/>
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 10}}>
          <View style={styles.info}>
          <MaterialIcon name='store' size={24}/>
          <Text style={styles.restText}>{lastOrder.restaurant.name}</Text>
          </View>
          <View style={styles.info}>
          <Icon name='mail' size={19}/>
          <Text style={styles.restText}>{lastOrder.restaurant.email}</Text>
          </View>
          <View style={styles.info}>
          <Icon name='phone' size={19}/>
          <Text style={styles.restText}>{lastOrder.restaurant.phone}</Text>
          </View>
          </View>
        </View>
      )
    }
    else {
      return null
    } 
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text type='semibold' style={styles.hello}>Hi, {this.props.firstName}!</Text>
          {this.props.allOrders.length ? this.renderLastActiveOrder() : null}
        </View>
        { this.props.allOrders.length ?
        (<View style={{flex: 1.4, paddingBottom: 70, marginTop: 8}}>
            <Text type='semibold' style={styles.subheader}>Previous Orders</Text>
            {/* <Divider style={styles.divider}/> */}
            <ScrollView contentContainerStyle={styles.scroll}>
              { this.props.allOrders.length ? this.renderAllOrders() : <ActivityIndicator size="large" color="#0000ff"/> }
            </ScrollView>
            </View>)
          :
          null
        }
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
  hello: {
    fontSize: 32,
    marginTop: 25,
    marginBottom: 8,
  },
  subheader: {
    marginTop: 5,
    paddingHorizontal: 20,
    color: '#1DA2FF',
    fontSize: 24,
    textAlign: 'center'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingBottom: 5
  },  
  restText: {
    fontSize: 16,
    paddingLeft: 8
  },
  divider: { 
    backgroundColor: 'black', 
    marginTop: 10, 
    marginBottom: 10,
    alignItems: 'stretch'
  },
  scroll: {
    marginBottom: 25,
    alignItems: 'stretch'
  },
  image: {
    width: 50,
    height: 50
  }
})