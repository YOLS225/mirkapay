import React, { useState } from 'react';
import { StyleSheet, View,TouchableOpacity } from "react-native";
import { Colors } from "@/app/constants/colors";


export const PaginationIndicator = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Index de la page active

  // Simuler 4 étapes/pages
  const totalPages = 4;

  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <TouchableOpacity 
          key={index}
          style={[
            styles.dot, 
            activeIndex === index ? styles.activeDot : styles.inactiveDot
          ]}
          onPress={() => setActiveIndex(index)} // Change la page active au clic
        />
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginBottom:60
      },
      dot: {
        width: 9,
        height: 9,
        borderRadius: 7.5,
        marginHorizontal: 5,
      },
      activeDot: {
        backgroundColor: Colors.main.orange, 
      },
      inactiveDot: {
        backgroundColor: '#d3e3f1',
      },

});