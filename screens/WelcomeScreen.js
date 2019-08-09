import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

class WelcomeScreen extends Component {
    render() {
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.75
                    }}
                    source={{ uri: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'}}
                    />
                <Text style={styles.logo}>YUMTUM</Text>
                <Text style={styles.sublogo}>Food At Your Fingertips</Text>
                <Input
                    placeholder='Full Name'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder='Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    placeholder='Confirm Password'
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Button title="Create Account" onPress={() => alert('button pressed for signup')} />
                <Text>By creating an account, you agree to our <Text style={styles.link}>Terms</Text></Text>
                    <Text>Already have an account?<Text
                        style={styles.link}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        Log In
                    </Text>
                </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }
}

export default WelcomeScreen

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
    }
})