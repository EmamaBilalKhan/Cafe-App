import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Products(props) {
  return (
    <ScrollView contentContainerStyle={styles.productsView}>
      {/* Render products in pairs using a loop */}
      {props.menu.map((item, index) => {
        const isEvenIndex = index % 2 === 0; 

        return (
          <View key={item.id} style={[styles.productView, isEvenIndex && styles.productViewFirst]}>
            <Image source={{ uri: item.Image }} style={styles.ProductImage} />
            <Text style={styles.ProductName}>{item.Name}</Text>
            <View style={styles.productDetailView}>
              <Text style={styles.productprice}>{item.Price}</Text>
              <AntDesign name="pluscircle" size={22} color="#74512D" style={styles.addlogo} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp(90),
    marginHorizontal: wp(5),
    justifyContent:"space-around"
  },
  productView: {
    width: wp(40), 
    height: hp(20),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom:hp(2)
    
  },
  productViewFirst: { 
    marginRight: wp(10), 
  },
  ProductImage: {
    height: hp(12),
    marginVertical: hp(0.5),
    width: wp(34),
    borderRadius:10
  },
  productDetailView: {
    flexDirection: 'row',
  },
  ProductName:{
    fontWeight:"500"
  },
  productprice:{
    fontSize: hp(1.8),
    fontWeight:"500",
    marginTop:hp(0.3)
  },
  addlogo:{
    marginLeft: wp(18),
    marginTop: hp(0.1)
  }
});
