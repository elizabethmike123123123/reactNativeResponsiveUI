import {Component} from 'react';
import {responsive} from 'react-native-responsive-ui';
import {View, StyleSheet, Text,} from 'react-native';

// @responsive
export default class Responsive extends Component {
  render() {
    const {width, height} = this.props.window;
    const mode = height > width ? 'portrait' : 'landscape';
    console.log(`New dimensions ${width}x${height} (${mode})`);
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}
