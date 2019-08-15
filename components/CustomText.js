import React, { Component } from 'react';
import { Text } from "react-native";

class CustomText extends Component {

    setFontType = type => {
        switch(type){
            case 'bold':
                return 'comfortaa-bold'
            case 'light':
                return 'comfortaa-light'
            case 'medium':
                return 'comfortaa-medium'
            case 'semibold':
                return 'comfortaa-semibold'
            default:
                return 'comfortaa-regular'
        }
    }
    render() {
        const font = this.setFontType(this.props.type ? this.props.type: 'normal')
        const style = [{fontFamily: font}, this.props.style || {}]
        const allProps = Object.assign({}, this.props, {style: style})
        return (
            <Text {...allProps}>{this.props.children}</Text>
        );
    }
}

export default CustomText;