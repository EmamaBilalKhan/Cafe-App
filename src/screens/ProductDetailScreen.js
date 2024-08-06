import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useProductStore } from '../Store/Store';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen({route}) {
    const { item } = route.params;
    const [itemInstructions, setinstructions]=useState('');
    const navigation = useNavigation();
    const addToCart = useProductStore((state) => state.addToCart)

    const handleBackPress = () => {
      navigation.popToTop()
    };
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>

     <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
      <Image source={{uri: item.Image}} style={styles.ProductImage}></Image>
      <Ionicons name="chevron-back-circle-sharp" size={hp(5)} color="white" style={styles.backButton} onPress={handleBackPress}/>
      </View>
        <Text style={styles.ProductName}>{item.Name}</Text>
        <View style={styles.AboutSection}>
          <Text style={styles.about}>About</Text>
          <Text style={styles.AboutText}>{item.Description}</Text>
          
        </View>
        <View style={styles.InstructionSection}>
        <Text style={styles.Instructions}>Instructions</Text>
          <TextInput style={styles.InstructionsBox} placeholder='Instructions for your order e.g. no sugar'
            value={itemInstructions}
            onChangeText={(text) => setinstructions(text)}
            multiline={true} 
            numberOfLines={3}
      ></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{const itemWithInstructions = { ...item, Instructions: itemInstructions }
        addToCart(itemWithInstructions)
        }} style={styles.Cartbutton}><Text style={styles.Cartbuttontext}>Add to Cart     |     {item.Price}</Text></TouchableOpacity>
      
     </SafeAreaView></>
    );
  }

const styles = StyleSheet.create({
container:{
        flex:1,
        backgroundColor: "white",
        alignItems:"center",
    },
    imageContainer:{
        position:"relative"  
    },
ProductImage:{
  height: hp(40),
  width: wp(100),
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  
},

ProductName:{
  fontWeight:"bold",
  color:"#74512D",
  fontSize:hp(4),
},
AboutSection:{
  alignItems:"flex-start",
  flexWrap:"wrap"
},
about:{
  fontWeight:"bold",
  color:"Black",
  fontSize:hp(2.5),
  paddingLeft: wp(1)
},
AboutText:{
  fontSize:hp(2),
  paddingHorizontal: wp(2)
},
InstructionSection:{
  alignItems:"flex-start",
  marginTop:hp(2)
},
Instructions:{
  fontWeight:"bold",
  color:"Black",
  fontSize:hp(2.5),
  paddingLeft: wp(1),
  
},
InstructionsBox:{
  fontSize:hp(2),
  borderWidth: 1,
  borderColor: "gray",
  borderRadius:20,
  height: hp(15),
  width: wp(96),
  marginHorizontal: wp(2),
  marginTop: hp(2),
 textAlignVertical: 'top',
  padding: wp(2), 
},
Cartbutton:{
  width: wp(60),
  height: hp(6),
  marginVertical: hp(2),
  marginHorizontal: wp(30),
  backgroundColor: "#74512D",
  borderRadius: 30,
  alignItems:"center",
  justifyContent:"center"
},
Cartbuttontext:{
  color: "white",
  fontWeight:"bold"
},
backButton:{
 position:"absolute",
 Top:0,
 Left:0,
 zIndex: 1,
 marginTop: hp(1),
 marginLeft: wp(1.3)
}
});
