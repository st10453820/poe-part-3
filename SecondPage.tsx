import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

interface MenuItem {
  id: string;
  name: string;
  course: string;
  price: number;
}

const exampleMenuItems: MenuItem[] = [
  { id: '1', name: 'Garlic Bread', course: 'Starters', price: 5.00 },
  { id: '2', name: 'Caesar Salad', course: 'Starters', price: 7.50 },
  { id: '3', name: 'Grilled Chicken', course: 'Mains', price: 15.00 },
  { id: '4', name: 'Beef Burger', course: 'Mains', price: 12.00 },
  { id: '5', name: 'Pasta Primavera', course: 'Mains', price: 10.00 },
  { id: '6', name: 'Cheesecake', course: 'Desserts', price: 6.50 },
  { id: '7', name: 'Chocolate Cake', course: 'Desserts', price: 7.00 },
  { id: '8', name: 'Fruit Salad', course: 'Desserts', price: 5.50 },
];

const HomeScreen: React.FC<Props> = ({ menuItems = exampleMenuItems }) => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const calculateAveragePrice = (course: string) => {
    const filteredItems = menuItems.filter(item => item.course === course);
    const totalPrice = filteredItems.reduce((acc, item) => acc + item.price, 0);
    return filteredItems.length ? (totalPrice / filteredItems.length).toFixed(2) : '0.00';
  };

  const navigateToCourse = (course: string) => {
    if (course) {
      navigation.navigate('Guest Menu' as never, { course } as never);
      setSelectedCourse(''); // Reset selection after navigation
    }
  };

  return (
    // Use ImageBackground to set the background image to 'grilledchicken.png'
    <ImageBackground source={require('./images/grilledchicken.png')} style={styles.background}>
      <View style={styles.container}>
        {/* Logo at the top center */}
        <Image source={require('./images/logo.png')} style={styles.logo} />

        {/* Grouped header and average price display */}
        <View style={styles.averagePriceSection}>
          <Text style={styles.header}>Average Menu Prices</Text>
          <View style={styles.averagePriceContainer}>
            <Text style={styles.averagePriceText}>Starters: ${calculateAveragePrice('Starters')}</Text>
            <Text style={styles.averagePriceText}>Mains: ${calculateAveragePrice('Mains')}</Text>
            <Text style={styles.averagePriceText}>Desserts: ${calculateAveragePrice('Desserts')}</Text>
          </View>
        </View>

        {/* Dropdown for course selection */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select a Course:</Text>
          <Picker
            selectedValue={selectedCourse}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedCourse(itemValue);
              if (itemValue) navigateToCourse(itemValue);
            }}
          >
            <Picker.Item label="Choose a course..." value="" />
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Mains" value="Mains" />
            <Picker.Item label="Desserts" value="Desserts" />
          </Picker>
        </View>

        {/* Button to navigate to Manage Menu */}
        <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('Manage Menu' as never)}>
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',  // Ensures the image covers the entire screen
    justifyContent: 'center', // Centers content vertically
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for readability
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  averagePriceSection: {
    alignItems: 'center',
    marginBottom: 20, // Space between this section and the dropdown
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10, // Reduced spacing to bring the title closer to the average prices
  },
  averagePriceContainer: {
    alignItems: 'center',
  },
  averagePriceText: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 3, // Reduce vertical spacing between price items for a compact display
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#808080',
    borderRadius: 8,
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 8,
    textAlign: 'center',
  },
  picker: {
    color: '#fff',
    fontSize: 16,
    height: 40,
  },
  manageButton: {
    backgroundColor: '#808080',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen;
