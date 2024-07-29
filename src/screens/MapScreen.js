import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView from 'react-native-maps';

export default function MapScreen(){
   
    return(
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white"/>
            <MapView style={styles.MapView}>

            </MapView>
        </>
        
    );
    
    
}

const styles= StyleSheet.create({
    MapView:{
        width: wp(100),
        height:hp(100)
    }
})