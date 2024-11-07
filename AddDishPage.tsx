import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Dish {
  id: string;
  name: string;
  type: string;
}

const App: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<string>('All');

  const dishes: Dish[] = [
    { id: '1', name: 'Pasta', type: 'Italian' },
    { id: '2', name: 'Sushi', type: 'Japanese' },
    { id: '3', name: 'Tacos', type: 'Mexican' },
    { id: '4', name: 'Pizza', type: 'Italian' },
    { id: '5', name: 'Ramen', type: 'Japanese' },
  ];

  // Filter dishes based on the selected type
  const filteredDishes = selectedDish === 'All'
    ? dishes
    : dishes.filter(dish => dish.type === selectedDish);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Dish Type:</Text>
      <Picker
        selectedValue={selectedDish}
        style={styles.picker}
        onValueChange={(itemValue: string) => setSelectedDish(itemValue)}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Italian" value="Italian" />
        <Picker.Item label="Japanese" value="Japanese" />
        <Picker.Item label="Mexican" value="Mexican" />
      </Picker>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
