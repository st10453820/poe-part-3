import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

type AddMenuPageProps = {
  route: {
    params: {
      selectedDishes: { name: string; description: string; price: number }[];
    };
  };
};

const AddMenuPage: React.FC<AddMenuPageProps> = ({ route }) => {
  const { selectedDishes } = route.params;

  // Initialize selected state based on the selected dishes
  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(selectedDishes.map((dish) => [dish.name, false]))
  );

  const toggleDishSelection = (dishName: string) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [dishName]: !prevSelected[dishName],
    }));
  };

  const calculateTotalPrice = () => {
    return selectedDishes.reduce((sum, dish) => {
      if (selected[dish.name]) {
        return sum + dish.price;
      }
      return sum;
    }, 0);
  };

  const calculateTotalItems = () => {
    return selectedDishes.reduce((count, dish) => {
      if (selected[dish.name]) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const handleConfirmSelection = () => {
    const totalPrice = calculateTotalPrice();
    const totalItems = calculateTotalItems();
    Alert.alert('Menu Added', `Total Items: ${totalItems}, Total Price: R${totalPrice.toFixed(2)}`, [
      { text: 'OK' },
    ]);
  };

  const totalPrice = calculateTotalPrice();
  const totalItems = calculateTotalItems();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Dishes for the Menu</Text>
      <FlatList
        data={selectedDishes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dishContainer, selected[item.name] ? styles.selectedDish : null]}
            onPress={() => toggleDishSelection(item.name)}
          >
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.dishDescription}>{item.description}</Text>
            <Text style={styles.dishPrice}>Price: R{item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.totalInfo}>Total Items: {totalItems}</Text>
      <Text style={styles.totalPrice}>Total Price: R{totalPrice.toFixed(2)}</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
        <Text style={styles.buttonText}>Confirm Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  dishContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    backgroundColor: '#1a1a1a',
  },
  selectedDish: {
    backgroundColor: '#28A745',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  dishDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  dishPrice: {
    fontSize: 16,
    color: '#808080',
  },
  totalInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});