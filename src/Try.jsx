import React, { Component } from 'react'

export default class Try extends Component {
    render() {
        return (
            <li>{this.props.fruit.try}는 {this.props.fruit.result}</li>
        )
    }
}
