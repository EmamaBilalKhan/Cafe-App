import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useProductStore } from '../Store/Store';

export default function Products() {
    const cart = useProductStore((state) => state.cart)
    const removeFromCart = useProductStore((state) => state.removeFromCart)
    const setTotal = useProductStore((state) => state.setTotal)

   useEffect(() => {
  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => {
      const priceWithoutDollarSign = item.Price ? item.Price.replace('$', '') : '0';
      const priceAsNumber = parseFloat(priceWithoutDollarSign);
      return acc + priceAsNumber;
    }, 0);
    setTotal(total);
  };
  calculateTotalPrice();
}, [cart]);

  return (
    <ScrollView>
      {cart.map((item, index) => (
  <View style={styles.CartView} key={index}>
    <View style={styles.productView}>
      <Image source={{ uri: item.Image }} style={styles.productImage} />
      <View style={styles.NameInstructionView}>
        <Text style={styles.productName}>{item.Name}</Text>
        <Text style={styles.instructions}>{item.Instructions}</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 5, right: 9 }}>
        <Text style={styles.price}>{item.Price}</Text>
      </View>
      <View style={{ position: 'absolute', Top: 5, right: 9 }}>
      <AntDesign name="minuscircle" style={styles.minusIcon} size={hp(2.3)} color="#74512D" onPress={()=>removeFromCart(item)} />
      </View>
    </View>
  </View>
))}

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
 CartView:{
    flexDirection:"column",
    marginHorizontal: wp(2),
    marginVertical: hp(2)
 },
 productView:{
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor:"gray",
    flexDirection:"row",
    padding: hp(1),
    position: 'relative'
 },
 productImage:{
    height: hp(12),
    width: wp(30),
    marginRight:wp(1),
    borderRadius: 20
 },
NameInstructionView:{
    flexDirection:"column",
    flexWrap:"wrap",
    width: wp(40),
    maxHeight: hp(30)
},
productName:{
    fontWeight:"bold",
    fontSize: hp(2)
},
instructions:{
    fontSize: hp(1.5)
},

price:{
    fontWeight:"bold",
},
minusIcon:{
  marginTop:hp(1)
}

});
