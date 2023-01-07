import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  View,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import GridFlatList from 'grid-flatlist-react-native';

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
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
      const json = await res.json();

      const resVals = Object.values(json);
      const head = resVals.slice(0, 2);
      const tail = resVals.slice(resVals.length - 4, resVals.length - 1);

      // set state with the result
      console.log(
        'json API response direct in method definition: ',
        // Where each val is an object in array, with all props
        head,
        tail
      );

      // TODO I know how to write this as a for, but how to do this as Array.from()?
      for (let i = 0; i < 200; i++) {
        // add dynamic link to json (treat as array?))
        // How to add key and value to object?
        json[
          i
        ].imgSrc = `https://unsplash.it/${styles.gridItemImg.width}/${styles.gridItemImg.height}?image=${i}`;
      }

      setMyData(json);
    };

    // make sure to catch any error
    fetchData().catch(err => console.error(err));
  }, []);

  const LeftContent = props => <Avatar.Icon {...props} icon='folder' />;

  const renderItem = ({ item }) => (
    // <View style={styles.gridItem}>
    //   <Pressable style={styles.button}>
    //     <View style={styles.innerContainer}>
    //       <Image
    //         source={{
    //           uri: `https://unsplash.it/${styles.gridItemImg.width}/${styles.gridItemImg.height}?image=${item?.id}`,
    //         }}
    //         style={styles.gridItemImg}
    //         resizeMode='cover'
    //       />
    //       <Text style={{ fontSize: 16 }}>{item?.title}</Text>
    //     </View>
    //   </Pressable>
    // </View>

    <View style={styles.gridItem}>
      <Card>
        {/* <Card.Title
          title={item?.title}
          subtitle={item?.id}
          left={LeftContent}
        /> */}
        <Card.Content>
          {/* <Text variant='titleLarge'>{item?.title}</Text> */}
          <Text variant='bodyMedium'>
            {item?.completed ? 'Completed' : 'Not yet completed'}
          </Text>
        </Card.Content>
        <Card.Cover
          source={{
            uri: `https://unsplash.it/${styles.gridItemImg.width}/${styles.gridItemImg.height}?image=${item?.id}`,
          }}
        />
        {/* Card Actions? */}
      </Card>
    </View>
  );

  return (
    <View>
      {/* <Text style={{ fontSize: 40 }}>Willl this show up?</Text> */}

      <FlatList
        data={myData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      {/* <GridFlatList
        data={myData}
        renderItem={renderItem}
        gap={30}
        paddingHorizontal={10}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#ecf0f1',
  },
  card: {
    flex: 1,
    height: 30,
    width: 30,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 60,
    height: 150,
    // width: 150,
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    backgroundColor: 'white',
  },
  gridItemImg: {
    flex: 1,
    width: 300,
    height: 300,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    height: 300,
    width: 300,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
