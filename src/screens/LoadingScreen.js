import {View, StyleSheet, Image} from 'react-native';
import { StatusBar } from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen(){
 
    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
        </SafeAreaView>
        </>
    );

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:"center"
    },
    coffeimage:{
        marginBottom:hp(2),
        height: hp(25),
        width: wp(48)
      }
})