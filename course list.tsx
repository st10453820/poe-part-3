import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Course = {
  name: string;
  dishes: { name: string; description: string; price: number }[];
};

const courses: Course[] = [
  {
    name: 'Starters',
    dishes: [
      { name: 'Spring Rolls', description: 'Crispy rolls filled with veggies.', price: 30 },
      { name: 'Bruschetta', description: 'Grilled bread topped with tomatoes and basil.', price: 25 },
    ],
  },
  {
    name: 'Mains',
    dishes: [
      { name: 'Grilled Chicken', description: 'Juicy chicken grilled to perfection.', price: 80 },
      { name: 'Pasta Primavera', description: 'Pasta with seasonal veggies.', price: 70 },
    ],
  },
  {
    name: 'Desserts',
    dishes: [
      { name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust.', price: 40 },
      { name: 'Chocolate Mousse', description: 'Rich chocolate mousse topped with whipped cream.', price: 45 },
      { name: 'Ice Cream', description: 'Vanilla ice cream served with a chocolate sauce.', price: 30 },
    ],
  },
];

const CourseListPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const renderCourse = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.courseContainer}
      onPress={() => navigation.navigate('CourseDetailPage', { course: item.name, dishes: item.dishes })}
    >
      <Text style={styles.courseName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course List</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  courseContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CourseListPage;
