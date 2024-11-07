import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { MenuItem } from './App'; // Make sure MenuItem is defined in App or adjust the import accordingly

interface Props {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const ManageMenuScreen: React.FC<Props> = ({ menuItems = [], setMenuItems }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starters');

  const addItem = () => {
    if (name && price) {
      const newItem: MenuItem = {
        id: (menuItems.length + 1).toString(),
        name,
        price: parseFloat(price),
        course,
      };
      setMenuItems([...menuItems, newItem]);
      setName('');
      setPrice('');
    } else {
      alert('Please enter a valid name and price.');
    }
  };

  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <ImageBackground source={require('./images/grilledchicken.png')} style={styles.background}>
      <View style={styles.overlayContainer}>
        <Text style={styles.header}>Add Menu Item</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>

        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{`${item.name} - $${item.price.toFixed(2)}`}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for readability
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#555',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ManageMenuScreen;
