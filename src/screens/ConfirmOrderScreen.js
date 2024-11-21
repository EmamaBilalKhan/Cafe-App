import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useProductStore } from '../Store/Store';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmOrderScreen({ navigation }) {
  const Total = useProductStore((state) => state.Total);
  const Location = useProductStore((state) => state.Location);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [Error, setError] = useState('');
  const handlePlaceOrder = () => {
    setError("");
    if (selectedPaymentMethod === 'visa') {
      if (!cardNumber || !cvc || !expiry || !cardHolderName) {
        setError('Please fill all the Visa card details.');
        return;
      }
  
      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        setError('Card number must be 16 digits.');
        return;
      }
  
      if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
        setError('CVC must be 3 digits.');
        return;
      }
  
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!expiryRegex.test(expiry)) {
        setError('Expiry date must be in MM/YY format.');
        return;
      }
  
      const [month, year] = expiry.split('/');
      const currentDate = new Date();
      const expiryDate = new Date(`20${year}`, month - 1);
  
      if (expiryDate < currentDate) {
        setError('Card expiry date is invalid or expired.');
        return;
      }
    }
  
    navigation.navigate("OrderCompletedScreen");
  };
  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <Ionicons name="arrow-back-sharp" size={hp(4)} color="#74512D" style={styles.backButton} onPress={() => navigation.goBack()} />
        <Text style={styles.OrderText}>Total Order Amount: ${Total}</Text>
        <Text style={styles.OrderText}>Location: </Text>
        <View style={styles.locationpin}>
          <Entypo name="location-pin" size={hp(2)} color="#74512D" style={{ marginTop: hp(0.3) }} />
          <Text style={{ fontSize: hp(2) }}> {Location}</Text>
        </View>
        <View style={styles.paymentMethods}>
          <Text style={styles.OrderText}>Payment Method: </Text>
          <TouchableOpacity style={styles.paymentMethod} onPress={() => setSelectedPaymentMethod('visa')}>
            
            <FontAwesome name="cc-visa" size={hp(2.5)} color="black" style={{ marginLeft: wp(3), marginTop: hp(0.5) }} />
            <Text style={styles.paymentMethodText}>Visa Debit Card</Text>
            {selectedPaymentMethod === 'visa' && <MaterialIcons name="verified" size={24} color="#74512D" style={{ marginLeft: wp(2) }} />}
            
          </TouchableOpacity>
          
        {selectedPaymentMethod === 'visa' && (
          <View style={styles.visaFields}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={16}
            />
            <TextInput
              style={styles.input}
              placeholder="CVC"
              keyboardType="numeric"
              value={cvc}
              onChangeText={setCVC}
              maxLength={3}
            />
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Holder Name"
              value={cardHolderName}
              onChangeText={setCardHolderName}
              maxLength={30}
            />
          </View>
        )}
          <TouchableOpacity style={styles.paymentMethod} onPress={() => setSelectedPaymentMethod('cash')}>
            <MaterialCommunityIcons name="cash" size={hp(4)} color="black" style={{ marginLeft: wp(2), marginTop: hp(0.5) }} />
            <Text style={styles.paymentMethodText}>Cash</Text>
            {selectedPaymentMethod === 'cash' && <MaterialIcons name="verified" size={24} color="#74512D" style={{ marginLeft: wp(2) }} />}
          </TouchableOpacity>
        </View>

        <>
        {Error && <Text style={styles.error}>{Error}</Text>}
        </>
        <TouchableOpacity style={styles.ConfirmButton} onPress={handlePlaceOrder}>
          <Text style={styles.ConfirmButtonText}>Place Order</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: wp(1),
    marginTop: hp(2),
  },
  OrderText: {
    fontWeight: 'bold',
    fontSize: hp(2.5),
    marginLeft: wp(3),
    marginTop: hp(2),
  },
  error:{
    color:"red",
    fontSize:hp(2.2),
    marginVertical:hp(2),
    marginHorizontal:wp(3)
},
  locationpin: {
    marginLeft: wp(3.5),
    flexDirection: 'row',
  },
  paymentMethods: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  ConfirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  ConfirmButton: {
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: '#74512D',
    borderRadius: 5,
    width: wp(94),
    marginHorizontal: wp(3),
    marginVertical: hp(2),
    position: 'absolute',
    bottom: 0,
  },
  visaFields: {
    marginTop: hp(2),
    paddingHorizontal: wp(3),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: hp(1),
    marginBottom: hp(1),
  },
});
