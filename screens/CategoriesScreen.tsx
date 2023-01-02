import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const CategoriesScreen = (foo?: any) => {
  // Pulling data like
  // GET https://api.unsplash.com//search/photos?query=food
  const [data, setData] = useState<
    {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
      imgSrc: string;
    }[]
  >();

  useEffect(() => {
    let items: { id: number; src: string }[] = Array.apply(null, Array(20)).map(
      (v, i) => {
        return {
          id: i,
          src: 'https://unsplash.it/400/400?image=' + (i + 1),
        };
      }
    );

    const res = fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json =>
        setData(prev => [
          {
            ...prev,
            completed: json.completed,
            id: json.id,
            title: json.title,
            userId: json.userId,
            imgSrc: 'https://unsplash.it/300/300',
          },
        ])
      );

    console.log(data);

    // TODO REQUIRES OAUTH TOKEN
    // const res2 = fetch('https://api.unsplash.com//search/photos?query=food')
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card>
            <Card.Title
              title={'Foo'}
              subtitle={'bar, beeeetch'}
              // left={LeftContent}
            />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Cover
              source={{ uri: 'https://unsplash.it/400/400?image=3' }}
            />
            <Card.Actions>
              <Button onPress={() => console.log('Cancel on card pressed')}>
                Cancel
              </Button>
              <Button onPress={() => console.log('OK on card pressed')}>
                Ok
              </Button>
            </Card.Actions>
          </Card>
        )}
        // keyExtractor={dummyData?.id}
      />
    </View>
  );
};

export default CategoriesScreen;
