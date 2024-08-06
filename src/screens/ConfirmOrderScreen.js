import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useProductStore } from '../Store/Store';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import OrderCompletedScreen from './OrderCompletedScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmOrderScreen({navigation}){
  const Total = useProductStore((state) => state.Total)
  const Location = useProductStore((state) => state.Location)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');

  return(
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      <SafeAreaView style={styles.container}>
        <Ionicons name="chevron-back-circle-sharp" size={hp(4)} color="#74512D" style={styles.backButton} onPress={()=>navigation.goBack()}/>
        <Text style={styles.OrderText}>Total Order Amount: ${Total}</Text>
        <Text style={styles.OrderText}>Location: </Text>
        <View style={styles.locationpin} >
          <Entypo name="location-pin" size={hp(2)} color="#74512D" style={{marginTop:hp(0.3)}}/>
          <Text style={{fontSize:hp(2)}}> {Location}</Text>
        </View>
        <View style={styles.paymentMethods}>
         <Text style={styles.OrderText}>Payment Method: </Text>
          <TouchableOpacity style={styles.paymentMethod} onPress={() => setSelectedPaymentMethod('visa')}>
            <FontAwesome name="cc-visa" size={hp(2.5)} color="black" style={{marginLeft: wp(3), marginTop:hp(0.5)}}  />
            <Text style={styles.paymentMethodText}>Visa Debit Card</Text>
            {selectedPaymentMethod === 'visa' && <MaterialIcons name="verified" size={24} color="#74512D" style={{marginLeft: wp(2)}} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod} onPress={() => setSelectedPaymentMethod('cash')}>
            <MaterialCommunityIcons name="cash" size={hp(4)} color="black" style={{marginLeft: wp(2), marginTop:hp(0.5)}} />
            <Text style={styles.paymentMethodText}>Cash</Text>
            {selectedPaymentMethod === 'cash' && <MaterialIcons name="verified" size={24} color="#74512D" style={{marginLeft: wp(2)}} />}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.ConfirmButton} onPress={()=>navigation.navigate(OrderCompletedScreen)}><Text style={styles.ConfirmButtonText}>Place Order</Text></TouchableOpacity>
      </SafeAreaView>
    </>
  );

}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "white",
    
  },

  backButton:{
    marginLeft: wp(1),
    marginTop:hp(2)
  },

  OrderText:{
    fontWeight:"bold",
    fontSize: hp(2.5),
    marginLeft: wp(3),
    marginTop: hp(2),
  },
  locationpin:{
    marginLeft: wp(3.5),
    flexDirection:"row"
  },
  paymentMethods:{
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: hp(2),
    
  },
  paymentMethod:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentMethodText:{
    fontSize: hp(2),
    fontWeight:"bold",
    marginLeft: wp(3)
  },
  ConfirmButtonText:{
    color:"white",
    fontWeight:"bold",
    fontSize:hp(2),
},
ConfirmButton:{
    alignItems:"center",
     paddingVertical: hp(1),
     paddingHorizontal: wp(3),
     backgroundColor:"#74512D",
     borderRadius: 20,
     width: wp(98),
     marginHorizontal: wp(1),
     marginVertical: hp(2),
     position: 'absolute',
     bottom: 0,
 },
});