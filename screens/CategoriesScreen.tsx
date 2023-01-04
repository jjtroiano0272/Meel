import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const CategoriesScreen = (foo?: any) => {
  // Pulling data like
  // GET https://api.unsplash.com//search/photos?query=food
  const [myData, setMyData] = useState<
    {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
      imgSrc?: string;
    }[]
  >();

  // .get('https://jsonplaceholder.typicode.com/todos/1')
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
      // convert the data to json
      const json = await res.json();

      // set state with the result
      console.log(json);
      setMyData(json);
    };

    // make sure to catch any error
    fetchData().catch(err => console.error(err));
  }, []);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0a-3da1-471f-bd96-145571e29d72',
      title: 'Fourth Item',
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Card>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.imgSrc}</Paragraph>
      </Card.Content>
      <Card.Cover
        source={{ uri: 'https://unsplash.it/400/400?image=' + item.id }}
      />
      <Card.Actions>
        <Button onPress={() => console.log('Cancel on card pressed')}>
          Cancel
        </Button>
        <Button onPress={() => console.log(myData)}>Ok</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      <Text style={{ fontSize: 40 }}>Willl this show up?</Text>

      <FlatList
        data={myData}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default CategoriesScreen;
