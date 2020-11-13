import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit'

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    {[moment()]: 2000}, 
    {[moment().subtract(1, 'day')] : 2500},
  ])

  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Me',
      timestamp: new Date(),
      amount: 409.99,
    },
  ]);
  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => {
      return total + Number(gig.amount)
    }, 0))
  }, [gigs])


  // const chartConfig = {
  //   backgroundGradientFrom: "green",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "green",
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false // optional
  // };
  // const data = {
  //   labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
  //   datasets: [
  //     {
  //       data: [10,23,11,98,90]
  //     }
  //   ]
  // };
  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
        timestamp: new Date(),
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


      <View>

        {/* <BarChart
          // style={graphStyle}
          data={data}
          
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        /> */}
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "steelblue",
            backgroundGradientFrom: "steelblue",
            backgroundGradientTo: "steelblue",
            decimalPlaces: null, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "blue"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
      <Text>Total Income: $ {total}</Text>

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

      {gigs.map((gig) => (
        <View  >
          <Text>{gig.description}</Text>
          <Text> $ {gig.amount}</Text>
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
