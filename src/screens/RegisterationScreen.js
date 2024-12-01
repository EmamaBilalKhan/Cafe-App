import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, TextInput, TouchableOpacity,Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {auth} from './Firebase.js';
import { useProductStore } from '../Store/Store.js';

export default function RegisterationScreen() {
    const setIsRegistered = useProductStore(state=>state.setIsRegistered);
    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");
    const [Error, setError] = useState(null);
    const URL = useProductStore(state=>state.URL);
    const handleRegistration = async () => {
        const IsRegistered = validateAndSubmit();
        if(IsRegistered!==null){
        if(IsRegistered){
            setIsRegistered(true);
        }
        else{
            setIsRegistered("false");
            setError("Registration Failed. Try Again.");
        }
    }
    
    };
    
    const validateAndSubmit = async () => {
        setError(null)
        if (Name && Contact && Address) {
            try{
                const idToken = await auth.currentUser.getIdToken();
                const response = await fetch(`${URL}/Users/RegisterUser`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`,
                  },
                  body:JSON.stringify({
                    name:Name,
                    contact:Contact,
                    address:Address
                  })
                });
            
                if (response.ok) {
                const data = await response.json();
                console.log("Reg Successful: ",data);
                return true;
                }
                else{
                  console.log("error: ", response.status)
                  return false;
                  
                }}
                catch(error){
                  console.log("error: ", error)
                  return false;
                }
    }
    else{
        setError("Fill in all the fields");
        return false;
    }
    }

    
        const handleLogout = async () => {
            await auth.signOut().then(()=>{
                console.log("User Logged Out")
      
              }).catch((error)=>{
                  console.log("Log out error: ", error)
              })
        }
    return (
        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Image source={require("../../assets/coffeelogin.png")} style={styles.coffeimage}/>
            <Text style={styles.RegistrationText}>Welcome! Register your details to continue..</Text>

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
                <View style={styles.Buttons}>
                    <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
                        <SimpleLineIcons name="logout" style={[styles.ButtonIcon]}  size={hp(2.3)} color="#a1020a" />
                        <Text style={styles.LogoutButtonText}> Log out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={handleRegistration}>
                        <Text style={styles.submitButtonText}> Next</Text>
                        <Ionicons name="arrow-forward-circle-outline" style={[styles.ButtonIcon, {paddingTop:hp(0.2)}]}  size={hp(3)} color="#74512D" />
                    </TouchableOpacity>
                </View>
                
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
    RegistrationText: {
        fontWeight:"bold",
        color:"#74512D",
        fontSize: hp(3),
        marginVertical:hp(2),
        marginHorizontal:wp(5)
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
    
    Buttons:{
        flexDirection:"row",
        marginVertical: hp(2.5),
        justifyContent:"space-between",
        width:wp(90),
        position:"absolute",
        bottom:hp(2)
    },
    submitButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    submitButtonText: {
        color: "#74512D",
        fontSize: hp(2.7),
        fontWeight: "bold",
    },
    
    ButtonIcon:{
        marginTop:hp(0.2),
        marginHorizontal:wp(0.4)
    },
    LogoutButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    LogoutButtonText: {
        color: "#a1020a",
        fontSize: hp(2.5),
        fontWeight: "bold",
    },
    coffeimage:{
        marginBottom:hp(2),
        height: hp(20),
        width: wp(38)
      }
});
