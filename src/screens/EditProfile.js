import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore } from '../Store/Store.js';
import { AntDesign } from '@expo/vector-icons';
import { auth } from './Firebase.js';
import { useNavigation } from '@react-navigation/native';
export default function EditProfile() {
    const navigation = useNavigation();
    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");
    const [Error, setError] = useState(null);
    const URL = useProductStore(state=>state.URL);
    const setLocation = useProductStore(state=>state.setLocation)
    useEffect(()=>{
        const fetchUserDetails= async()=>{
            const user = auth.currentUser;
            if (user) {
              try{
              const idToken = await user.getIdToken();
          
              const response = await fetch(`${URL}/Users/UserInformation`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}`,
                },
              });
          
              if (response.ok) {
              const data = await response.json();
              setName(data.username);
              setContact(data.contact);
              setAddress(data.address);
              }
              else{
                console.log("error: ", response.status)
                setError("Error getting user details. Please Try Again.")
              }}
              catch(error){
                console.log("error: ", error)
                setError("Error getting user details. Please Try Again.")

              }
            }
        }
    fetchUserDetails();
    },[]);

    const validateAndSubmit = async () => {
        setError(null)
        if (Name && Contact && Address) {
            const user = auth.currentUser;
            if (user) {
              try{
              const idToken = await user.getIdToken();
          
              const response = await fetch(`${URL}/Users/EditUserInformation`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                  name: Name,
                  contact: Contact,
                  address: Address,
                }),
              });
          
              if (response.ok) {
                console.log("User details updated successfully");
                setLocation(Address);
            }
              else{
                console.log("error: ", response.status)
                setError("Error updating user details. Please Try Again.")
                
              }}
              catch(error){
                console.log("error: ", error)
                setError("Error updating user details. Please Try Again.")

            }
          
              
            }
    }
    else{
        setError("Fill in all the fields");
        return false;
    }
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.TopView}>
            <AntDesign name="arrowleft" size={hp(3.5)} color="#74512D" style={styles.backArrow} onPress={()=>navigation.goBack()}/>
            <Text style={styles.TopText}>Edit Profile</Text>
            </View>
                <ScrollView contentContainerStyle={styles.inputContainer}>
                    <Text style={styles.required}>*Required Fields</Text>
                   
                    <Text style={styles.label}>Name<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Name"
                            placeholderTextColor="#B0B0B0"
                            value={Name}
                            onChangeText={setName}
                            maxLength={30}
                        />
                    </View>

                    {/* Contact */}
                    <Text style={styles.label}>Contact<Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Contact Number"
                            placeholderTextColor="#B0B0B0"
                            value={Contact}
                            onChangeText={setContact}
                            keyboardType="numeric"
                            maxLength={15}
                        />
                    </View>

                    <Text style={styles.label}>Address<Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Address"
                            placeholderTextColor="#B0B0B0"
                            value={Address}
                            onChangeText={setAddress}
                            maxLength={50}
                        />
                    </View>

                {Error && <Text style={styles.error}>{Error}</Text>}
                </ScrollView>
                    <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
                        <Text style={styles.submitButtonText}>Edit</Text>
                    </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: hp(2),
        alignItems: "center",
        position:"relative"
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
        fontSize: hp(2.3),
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
        width: wp(30),
        height: hp(5),
        marginVertical: hp(2),
        marginHorizontal: wp(25),
        backgroundColor: "#74512D",
        borderRadius: 5,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:1
    },
    submitButtonText: {
        color: "white",
        fontSize: hp(2.7),
        fontWeight: "bold",
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
    }
});
