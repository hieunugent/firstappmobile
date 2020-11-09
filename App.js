import React, {Component} from 'react';
import {SafeAreaView, View} from 'react-native';
export default class FixedDimensionsBasics extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{width: 50, height: 50, backgroundColor: 'blue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </SafeAreaView>
    );
  }
}
