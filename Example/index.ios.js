import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import AnimationConstructor from '../lib/AnimationConstructor';
import animationConfig from './animationConfig';

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AnimationConstructor
          ref='_anim'
          component='view'
          config={animationConfig}>
          <View style={styles.cubeStyle}/>
        </AnimationConstructor>
        <TouchableOpacity onPress={() => this.refs._anim.emitEvent('start')}>
          <Text>Scale</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cubeStyle: {
    position: 'absolute',
    top: 0,
    height: 100,
    width: 100,
    backgroundColor: 'blue'
  }
});

AppRegistry.registerComponent('Example', () => Example);
