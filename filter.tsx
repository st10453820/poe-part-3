import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FilterPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dishes = route.params.dishes;

  const renderDish = (course: string) => (
    <View style={styles.courseContainer}>
      <Text style={styles.courseTitle}>{course}</Text>
      <FlatList
        data={dishes[course]}
        renderItem={({ item }) => (
          <Text style={styles.dishName}>
            {item.name} - R{item.price.toFixed(2)}
          </Text>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter by Course</Text>
      {Object.keys(dishes).map((course) => (
        <TouchableOpacity
          key={course}
          onPress={() => navigation.navigate('FilteredDishes', { course, dishes })}
        >
          {renderDish(course)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  courseContainer: {
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dishName: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default FilterPage;
