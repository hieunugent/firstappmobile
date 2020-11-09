import React, {Component, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Todo from './Todo';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodo] = useState([]);

  const addTodo = () => {
    setTodo([input, ...todos]);
    setInput('');
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>My Todo List App </Text>
      </View>
      <ScrollView>
        {todos.map((todo) => (
          <Todo item={todo} />
        ))}
      </ScrollView>

      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="enter some thing"
        style={styles.inputText}
      />

      <Button onPress={addTodo} title="Add TODO List" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleText: {
    backgroundColor: 'steelblue',
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputText: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    margin: 20,
  },
});
export default App;
