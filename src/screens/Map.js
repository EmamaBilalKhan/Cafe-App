import { StatusBar } from "expo-status-bar";
import { StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";

export default function Map(){
    return(
        <>
          <StatusBar barStyle="dark-content" backgroundColor="white"/>
          <SafeAreaView>
          <MapView style={styles.Map}/>
        </SafeAreaView>
        </>
      );
}

const styles= StyleSheet.create({
    Map:{
      height:hp(100),
      width:wp(100)
    }
})