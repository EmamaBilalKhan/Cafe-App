import { Text , View, StyleSheet, TouchableOpacity} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from '@expo/vector-icons/Feather';
import CartProducts from "./../components/CartProducts";
import { useProductStore } from '../Store/Store';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen({navigation}){
    const total = useProductStore((state) => state.Total)
    const handleConfirmOrder = () => {
        if(total!==0){
        navigation.navigate("ConfirmOrderScreen");}
    }
    return(
        <>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      <SafeAreaView style= {styles.container}>
        <Feather name="shopping-cart" size={24} color="#74512D" style={styles.trucklogo} />
        <Text style={styles.OrderText}>Your Order: </Text>
        <CartProducts/>
        <Text style={styles.TotalPriceText}>Total : ${total}</Text>
        <TouchableOpacity style={styles.ConfirmButton} onPress={handleConfirmOrder}><Text style={styles.ConfirmButtonText}>Confirm Order</Text></TouchableOpacity>
      </SafeAreaView></>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
       
    },
    OrderText:{
        fontWeight:"bold",
        fontSize: hp(3),
        marginLeft: wp(3),
        marginTop: hp(2)
    },
    trucklogo:{
        alignSelf:"flex-end",
        marginRight: wp(1.5),
        marginTop:hp(2)
    },
    ConfirmButton:{
       alignItems:"center",
        alignSelf:"flex-end",
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        backgroundColor:"#74512D",
        borderRadius: 5,
        width: wp(94),
        marginHorizontal: wp(3),
        marginVertical: hp(1)
    },
    ConfirmButtonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:hp(2),
    },
    TotalPriceText:{
        alignSelf:"flex-end",
        fontWeight:"bold",
        fontSize:hp(2),
        marginHorizontal: wp(2),
        marginVertical: hp(1)
    }
}
)