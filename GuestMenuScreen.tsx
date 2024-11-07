import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MenuItem } from './App';

interface Props {
  menuItems: MenuItem[];
}

const GuestMenuScreen: React.FC<Props> = ({ menuItems = [] }) => {
  const route = useRoute<RouteProp<{ params: { course: string } }, 'params'>>();
  const { course } = route.params;

  // Safe filter check to avoid crashes
  const filteredItems = menuItems?.filter((item) => item.course === course) || [];

  // Function to get the correct image source based on item name
  const getImageSource = (itemName: string): number | null => {
    switch (itemName) {
      case 'Bruschetta':
        return require('./images/bruschetta.png');
      case 'Salad':
        return require('./images/salad.png');
      case 'Grilled Chicken':
        return require('./images/grilledchicken.png');
      case 'Spaghetti Carbonara':
        return require('./images/spaghetticarbonara.png');
      case 'Cheesecake':
        return require('./images/cheesecake.png'); // Image source for Cheesecake
      case 'Chocolate Mousse':
        return require('./images/chocolatemousse.png'); // Image source for Chocolate Mousse
      default:
        return null; // or a placeholder image
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{course} Menu</Text>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Display item image if available */}
              {getImageSource(item.name) && (
                <Image source={getImageSource(item.name)} style={styles.itemImage} />
              )}
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{`${item.name} - $${item.price.toFixed(2)}`}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Order</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No items found for this course.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1, // Allows text to fill available space
  },
  itemText: {
    color: '#fff',
    fontSize: 20,
  },
  noItemsText: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GuestMenuScreen;
