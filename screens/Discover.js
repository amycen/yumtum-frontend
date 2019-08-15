import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Animated, PanResponder, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from '@expo/vector-icons/Feather'
import {selectItem} from '../actions/item'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Discover extends Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.selectedItem = ''

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [
                {
                    rotate: this.rotate
                },
                ...this.position.getTranslateTransform()
        ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })

        this.nopeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
            outputRange: [1, 0.7, 1],
            extrapolate: 'clamp'
        })
    }

    componentWillMount(){
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({x: gestureState.dx, y:gestureState.dy})
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx > 120) {
                    Animated.spring(this.position,{
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy}
                    }).start(() => {
                            this.position.setValue({x: 0, y:0})
                            this.props.selectItem(this.selectedItem)
                            console.warn("current idx", this.props.currItemIdx )
                            this.props.navigation.navigate('Checkout')
                            console.warn("current idx", this.props.currItemIdx )
                    })
                }
                
                else if(gestureState.dx < -120) {
                    Animated.spring(this.position,{
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy}
                    }).start(() => {
                        this.props.selectItem(this.selectedItem)
                        this.position.setValue({x: 0, y:0})
                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }


    renderItems = () => {
        return this.props.allItems.map((item, i) => {
            if(i < this.props.currItemIdx) {
                return null
            }
            else if(i == this.props.currItemIdx){
                this.selectedItem = item
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id}
                        style={[this.rotateAndTranslate, {height: SCREEN_HEIGHT-240, width: SCREEN_WIDTH, paddingLeft: 22, paddingRight: 22, paddingTop: 22, position: 'absolute'}]}
                    >
                        <Animated.View style={{opacity: this.likeOpacity, transform: [{ rotate: '-25deg'}], position: 'absolute', top: 50, left: 40, zIndex: 1000}}>
                            <Text style={{borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10}}>LIKE</Text>
                        </Animated.View>
                        
                        <Animated.View style={{opacity: this.nopeOpacity, transform: [{ rotate: '25deg'}], position: 'absolute', top: 50, right: 40, zIndex: 1000}}>
                            <Text style={{borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10}}>NOPE</Text>
                        </Animated.View>
                        
                        
                                <View style={styles.price}>
                                <Text style={{fontSize: 16}}>${item.price.toFixed(2)}</Text>
                                </View>
                            <Image 
                            source={{uri: item.image}}
                            style={{flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}} 
                            onPress={() => this.props.navigation.navigate('Detail')}
                            />
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                    key={item.id}
                    style={[{opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}], height: SCREEN_HEIGHT-240, width: SCREEN_WIDTH, paddingLeft: 22, paddingRight: 22, paddingTop: 22, position: 'absolute'}]}
                    >
                        <View style={styles.price}>
                            <Text style={{fontSize: 16}}>${item.price.toFixed(2)}</Text>
                        </View>
                        <Image 
                        source={{uri: item.image}}
                        style={{flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}} 
                        />
                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            
            <View style={{flex: 1}}>
            {/* <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Detail')}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    width: '80%',
                    height: '80%',
                  }}
                  source={{ uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'}}
                  
                  />
                  </View>
          </TouchableWithoutFeedback>  */}
                <View style={{flex: 1}}>
                    {this.renderItems()}
                    <Text style={styles.bottomText}>More food options are coming! <Icon name='truck' size={24}/> </Text>
                </View>
                <View style={{height: 30}}>

                </View>
            </View>
        )
      }
}

const msp = state => {
    return {
      allItems: state.item.allItems,
      currItemIdx: state.item.currItemIdx
    }
}

export default connect(msp, {selectItem})(Discover)

const styles = StyleSheet.create({
    price: {
        padding: 5,
        position: 'absolute',
        bottom: 20, 
        right: 40,
        backgroundColor: 'white',
        opacity: 0.5,
        color: 'black',
        zIndex: 100
    },
    bottomText: {
        alignSelf: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.3,
        color: '#585858', 
        fontSize: 20,
        zIndex: -2
    }
})