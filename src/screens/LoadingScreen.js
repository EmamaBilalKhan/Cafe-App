import {View, StyleSheet, Image} from 'react-native';
import { StatusBar } from "expo-status-bar";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function LoadingScreen(){
 
    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <View style={styles.container}>
        <Image source="../../assets/coffeelogin.png" style={styles.coffeimage}/>
        </View>
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
        height: hp(20),
        width: wp(38)
      }
})