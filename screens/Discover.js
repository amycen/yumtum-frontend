import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions, Animated, PanResponder } from "react-native";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const items = [
    {id: "1", uri: require('../assets/1.jpg')},
    {id: "2", uri: require('../assets/2.jpg')},
    {id: "3", uri: require('../assets/3.jpg')},
    {id: "4", uri: require('../assets/4.jpg')},
    {id: "5", uri: require('../assets/5.jpg')},
    {id: "6", uri: require('../assets/6.jpg')}
]

class Discover extends Component {

    constructor() {
        super()

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0
        }

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
                        this.setState({currentIndex: this.state.currentIndex + 1},
                        () => {
                            this.position.setValue({x: 0, y:0})
                        })
                    })
                }
                else if(gestureState.dx < -120) {
                    Animated.spring(this.position,{
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy}
                    }).start(() => {
                        this.setState({currentIndex: this.state.currentIndex + 1},
                        () => {
                            this.position.setValue({x: 0, y:0})
                        })
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
        return items.map((item, i) => {
            if(i < this.state.currentIndex) {
                return null
            }
            else if(i == this.state.currentIndex){
                return (
                    <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={item.id}
                    style={[this.rotateAndTranslate, {height: SCREEN_HEIGHT-240, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}]}
                    >
                        <Animated.View style={{opacity: this.likeOpacity, transform: [{ rotate: '-25deg'}], position: 'absolute', top: 50, left: 40, zIndex: 1000}}>
                            <Text style={{borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10}}>LIKE</Text>
                        </Animated.View>
                        
                        <Animated.View style={{opacity: this.nopeOpacity, transform: [{ rotate: '25deg'}], position: 'absolute', top: 50, right: 40, zIndex: 1000}}>
                            <Text style={{borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10}}>NOPE</Text>
                        </Animated.View>
                        
                        <Image 
                        source={item.uri}
                        style={{flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}} 
                        />
                    </Animated.View>
                )
            }
            else {
                return (
                    <Animated.View
                    key={item.id}
                    style={[{opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}], height: SCREEN_HEIGHT-240, width: SCREEN_WIDTH, padding: 10, position: 'absolute'}]}
                    >
                        <Image 
                        source={item.uri}
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
                <View style={{height: 50}}>

                </View>
                <View style={{flex: 1}}>
                    {this.renderItems()}
                </View>
                <View style={{height: 60}}>

                </View>
            </View>
        )
      }
}

export default Discover