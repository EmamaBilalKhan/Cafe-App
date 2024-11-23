import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useProductStore } from '../Store/Store';
import { EmailAuthProvider } from 'firebase/auth';
import { auth } from './Firebase';
import { reauthenticateWithCredential } from "firebase/auth";

export default function SecurityScreen() {
    const navigation = useNavigation();
    const [CurrentPassword, setCurrentPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Error, setError] = useState(null);
    const IP = useProductStore(state=>state.IP);

    const validateAndSubmit=async()=>{
        if(CurrentPassword && NewPassword && ConfirmPassword){
            if(NewPassword===ConfirmPassword){
                if(NewPassword.length<8){
                    setError("Password should be atleast 8 characters long");
                    return;
                }
                else{
                    const user = auth.currentUser;
                    const credential = EmailAuthProvider.credential(
                        user.email,
                        CurrentPassword
                      );
                    try{
                      reauthenticateWithCredential(user, credential)
                      .then(async(result) => {
                         console.log(result);
                         try{
                            const idToken = await auth.currentUser.getIdToken();

                            const response = await fetch(`http://${IP}:3000/Users/changePassword`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${idToken}`,

                                },
                                body: JSON.stringify({
                                  password: NewPassword,
                                }),
                              });
                              if (response.ok) {
                                await auth.signOut().then(()=>{console.log("User Logged Out")}).catch((error)=>{console.log("Log out error: ", error)})
                                console.log("Password changed successfully");
                                navigation.goBack();
                              }
                              else{
                                console.log("error: ", response.error || response.message);
                                console.log("error: ", response);
                                setError("Error Changing password");
                              }
                         }
                         catch(error){
                            setError("Error Changing password");
                            console.log(error);
                            return;
                         }
                      })
                    }
                    catch(error) {
                         console.log(error);
                         setError("Current Password is incorrect");
                         return;
                      }
                }
            }
            else{
                setError("New Password and Confirm Password do not match");
            }
        }
        else{
            setError("Fill in all the fields");
        }
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.TopView}>
            <AntDesign name="arrowleft" size={hp(3.5)} color="#74512D" style={styles.backArrow} onPress={()=>navigation.goBack()}/>
            <Text style={styles.TopText}>Security</Text>
            </View>
            <View style={styles.inputContainer}>
                    <Text style={styles.required}>*Required Fields</Text>
                   
                    <Text style={styles.label}>Current Password<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Current Password"
                            placeholderTextColor="#B0B0B0"
                            value={CurrentPassword}
                            onChangeText={setCurrentPassword}
                            maxLength={15}
                        />
                    </View>

                    {/* Contact */}
                    <Text style={styles.label}>New Password<Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your New Password"
                            placeholderTextColor="#B0B0B0"
                            value={NewPassword}
                            onChangeText={setNewPassword}
                            keyboardType="numeric"
                            maxLength={15}
                        />
                    </View>

                    <Text style={styles.label}>Confirm New Password<Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            placeholderTextColor="#B0B0B0"
                            value={ConfirmPassword}
                            onChangeText={setConfirmPassword}
                            maxLength={15}
                        />
                    </View>

                {Error && <Text style={styles.error}>{Error}</Text>}
                </View>
                    <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
                        <Text style={styles.submitButtonText}>Save Changes</Text>
                    </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: hp(2),
        position:"relative"
    },
    TopText:{
        fontSize:hp(2.8),
        fontWeight:"bold",
        color:"#74512D"
    },
    TopView:{
        flexDirection:"row",
        marginTop:hp(0.5),
        justifyContent:"center",
        width: wp(100),
        alignItems:"center",
        borderBottomWidth:hp(0.06),
        borderBottomColor:"#d4d2cd",
        paddingBottom:hp(1)
        
    },
    backArrow:{
        position:"absolute",
        left: 0
    },
    
    inputContainer: {
        display: "flex",
        marginTop: hp(2),
        width: wp(90),
        marginHorizontal: wp(5)
    },
    label: {
        marginTop: hp(3),
        fontSize: hp(2.2),
        fontWeight: 'bold',
        color:"#74512D"
    },
    inputWrapper: {
        marginTop: hp(1),
        borderRadius: 10,
        backgroundColor: '#F8F4E1',
        paddingHorizontal: wp(1.2),
        height: hp(5),
        justifyContent: 'center'
    },
    input: {
        height: hp(3),
        fontSize: hp(2.2),
        color: 'black',
        backgroundColor: "#F8F4E1"
    },
    required:{
        color:"red",
        fontSize:hp(2.2)
    },
    error:{
        color:"red",
        fontSize:hp(2.2),
        marginVertical:hp(2)
    },
    submitButton: {
        width: wp(40),
        height: hp(5),
        marginVertical: hp(2),
        marginHorizontal: wp(25),
        backgroundColor: "#74512D",
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:1,
        paddingHorizontal:wp(1)
    },
    submitButtonText: {
        color: "white",
        fontSize: hp(2.3),
        fontWeight: "bold",
    },
});
