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
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Me',
      amount: 409.99,
    },
  ]);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);
    setDescription('');
    setAmount('');
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>My Todo List App </Text>
      </View>

      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="what did you do"
        style={styles.inputText}
      />
      <TextInput
        value={amount}
        onChangeText={(amount) => setAmount(amount)}
        placeholder="how much you make"
        keyboardType="numeric"
        style={styles.inputText}
      />
      <Button
        disabled={!amount && !description}
        onPress={addGig}
        title="Add Gig"
      />
      
         {gigs.map((index , gig) => (
          <View  key={index}>
          <Text>{gig.description}</Text>
          <Text>{gig.amount}</Text>
          </View>
         ))}
      
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
