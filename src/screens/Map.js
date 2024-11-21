/* removed map functionality so that app can be run on web. react native maps does not support web */

import { StatusBar } from "expo-status-bar";
import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
export default function Map({ navigation: { goBack } }){
    return(
        <>
          <StatusBar barStyle="dark-content" backgroundColor="white"/>
          <SafeAreaView>
          <Ionicons name="chevron-back-circle-sharp" size={hp(5)} color="#74512D" style={styles.backButton} onPress={()=>goBack()}/>

        </SafeAreaView>
        </>
      );
}

const styles= StyleSheet.create({
    Map:{
      height:hp(100),
      width:wp(100)
    },
    backButton:{
      marginTop: hp(1),
      marginLeft: wp(1.3)
     }
})