import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useProductStore } from '../Store/Store';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function OrderCompletedScreen({navigation}){
    const emptyCart = useProductStore((state) => state.emptyCart);
return(
    <>
        <StatusBar barStyle="light-content" backgroundColor="#2C2C2C"/>
        <SafeAreaView style={styles.container}>
        <FontAwesome6 name="truck-fast" size={hp(5)} color="#D2AE82" style={styles.logo} />
        <Text style={styles.Text}>Thankyou for your Order!</Text>
        <Text style={styles.Text}>Wait for the Call</Text>
        <TouchableOpacity style={styles.BackButton} onPress={()=>{emptyCart();
            navigation.popToTop();
        }}><Text style={styles.BackButtonText}>Back</Text></TouchableOpacity>

        </SafeAreaView>
    </>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#2C2C2C",
        alignItems:"center",
        justifyContent:"center"
    },
    Text:{
        color:"#D2AE82",
        fontSize: hp(3)
    },
    logo:{
        marginBottom:hp(1),
        
    },
    BackButtonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:hp(2),
    },
    BackButton:{
        alignItems:"center",
        backgroundColor:"#74512D",
        borderRadius: 5,
        width: wp(40),
        marginVertical: hp(2),
        position: 'absolute',
        bottom: 50,
        height:hp(4),
        justifyContent:"center"
     },
})