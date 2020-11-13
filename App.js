import moment from 'moment';
import React, {Component, useEffect, useState} from 'react';
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
import {LineChart, BarChart} from 'react-native-chart-kit';

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    {date: moment().format('LL'), amount: 2000},
    {date: moment().subtract(1, 'day').format('LL'), amount: 2500},
    {date: moment().subtract(2, 'day').format('LL'), amount: 1500},
    {date: moment().subtract(2, 'day').format('LL'), amount: 2500},
    {date: moment().subtract(2, 'day').format('LL'), amount: 3500},
    {date: moment().subtract(3, 'day').format('LL'), amount: 4500},
    {date: moment().subtract(4, 'day').format('LL'), amount: 5500},
  ]);
  const getDates = () => data.map((pair) => pair.date);
  const getAmounts = () => data.map((pair) => pair.amount);
  // [data1, data2, data3, ,data4, data5]
  // ['10/27/2020'] -> '10/27/2020'
  const transformData = (groupedData) => {
    const transformedArray = [];
    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({date: entry[0], amount: total});
    });

    return transformedArray;
  };

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  console.log('Debug', data);
  console.log('The date', getDates());
  console.log('the amount', getAmounts());

  console.log('the group by ', Object.entries(groupBy(data, 'date')));
  console.log('total group by value', transformData(groupBy(data, 'date')));
  const [gigs, setGigs] = useState([
    {
      description: 'Freelance job with Me',
      timestamp: new Date(),
      amount: 409.99,
    },
  ]);
  useEffect(() => {
    setTotal(
      gigs.reduce((total, gig) => {
        return total + Number(gig.amount);
      }, 0),
    );
  }, [gigs]);

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
  const dada = {
    labels: getDates(),
    datasets: [
      {
        data: getAmounts(),
      },
    ],
  };
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
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: 'steelblue',
            backgroundGradientFrom: 'steelblue',
            backgroundGradientTo: 'steelblue',
            decimalPlaces: null, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'blue',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
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
        <View>
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
