import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {my_auth} from './Firebase.js';

export default function ProfileScreen(){
    const signout=()=>{
        my_auth.signOut()
        .then(() => {
        console.log('Signed Out');
        })
        .catch(e=>{
        console.error('Sign Out Error', e);
        });
    }
    return(
        <TouchableOpacity onPress={signout}>bye</TouchableOpacity>
    );
    
    
}

const styles= StyleSheet.create({
    
})