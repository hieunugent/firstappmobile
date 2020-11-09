import React from 'react';
import {Text, View} from 'react-native';

const Todo = ({item}) => {
  return (
    <View>
      <Text>✅ {item} </Text>
    </View>
  );
};
export default Todo;
