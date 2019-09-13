import React, {Component} from 'react'
import {View, StyleSheet,SafeAreaView,Text} from 'react-native'
import HomeScreenStyles from './HomeScreenStyles';
// const React = require("react-native");
const GL = require("gl-react");
const {Surface} = require("gl-react-native");

const shaders = GL.Shaders.create({
    helloGL: {
        frag: `
precision highp float;
varying vec2 uv;

uniform float value;

void main () {
  gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
}
    `
    }
});







export default class HomeScreen extends Component{

    constructor (props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    componentDidMount () {
        const loop = time => {
            this.raf = requestAnimationFrame(loop);
            this.setState({
                value: (1 + Math.cos(time / 1000)) / 2 // cycle between 0 and 1
            });
        };
        this.raf = requestAnimationFrame(loop);
    }
    componentWillUnmount () {
        cancelAnimationFrame(this.raf);
    }
    render () {
        const { width, height } = this.props;
        const { value } = this.state;
        return <Surface width={width} height={height}>
            <GL.Node
                shader={shaders.helloGL}
                uniforms={{ value }}
            />
        </Surface>;
    }
}
