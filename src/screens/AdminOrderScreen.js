import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { useProductStore } from '../Store/Store';
import { auth } from './Firebase';
import { useState } from 'react';
export default function AdminOrderScreen({ route }) {
    const navigation = useNavigation();
    const IP = useProductStore((state)=>state.IP)
    const Order = route.params.Order;
    const Orders = Order.order;
    const [Error,setError]=useState("");
    console.log(Order);

    const getTimeFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const amPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${formattedMinutes} ${amPm}`;
    };

    const handleCompleted = async()=>{
        setError("")
        try{
            const idToken = await auth.currentUser.getIdToken();
            const response = await fetch(`http://${IP}:3000/Orders/DeleteOrder`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
              body: JSON.stringify({
                orderId:Order.id
              })
            });
            if(response.ok){
              console.log("Order Deleted Successfully");
              navigation.navigate("AdminMainScreen");
            }
            else{
              setError("Error in Deleting Order");
              console.log(response);
            }
          }
          catch(error){
            setError("Error in Deleting Order");
            console.log(response);
          }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.TopView}>
                <AntDesign name="arrowleft" size={hp(3.5)} color="#74512D" style={styles.backArrow} onPress={() => navigation.goBack()} />
                <Text style={styles.TopText}>Order Detail</Text>
            </View>
            <View style={styles.BottomView}>
                <Text style={styles.sectionHeading}>Customer Details: </Text>
                <Text style={styles.sectionText}>Name: {Order.user.username}</Text>
                <Text style={styles.sectionText}>Number: {Order.user.contact}</Text>
                <Text style={styles.sectionText}>Location: {Order.location}</Text>
                <Text style={styles.sectionText}>Total: ${Order.total}</Text>
                <Text style={styles.sectionText}>Payment Method: {Order.paymentMethod}</Text>
                <Text style={styles.sectionText}>Time: {getTimeFromTimestamp(Order.timestamp)}</Text>
                <Text style={styles.sectionHeading}>Order:</Text>
                <ScrollView>
                    {
                        Orders.map((order, index) => {
                            return (  // You need to return the JSX from the map
                                <View style={styles.OrderView} key={index}>
                                    <Image source={{ uri: order.Image }} style={styles.orderImage} />
                                    <View style={styles.OrderDetails}>
                                        <Text style={styles.sectionText}>Name: {order.Name}</Text>
                                        <Text style={styles.sectionText}>Price: {order.Price}</Text>
                                        <Text style={[styles.sectionText, {flexWrap:"wrap", width:'100%'}]}>Instructions: {order.Instructions}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <>{Error && <Text style={styles.Error}>{Error}</Text>}</>
                <TouchableOpacity onPress={handleCompleted} style={styles.Button}>
                <Text style={styles.ButtonText}>Completed</Text>
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
        position: "relative"
    },
    TopText: {
        fontSize: hp(2.8),
        fontWeight: "bold",
        color: "#74512D"
    },
    TopView: {
        flexDirection: "row",
        justifyContent: "center",
        width: wp(100),
        alignItems: "center",
        borderBottomWidth: hp(0.06),
        borderBottomColor: "#d4d2cd",
        paddingBottom: hp(2)
    },
    backArrow: {
        position: "absolute",
        left: 0
    },
    BottomView: {
        paddingHorizontal: hp(2)
    },
    sectionHeading: {
        fontSize: hp(2.5),
        fontWeight: "bold",
        marginVertical: hp(1)
    },
    sectionText: {
        fontSize: hp(2),
        marginHorizontal: wp(1),
        
    },
    orderImage: {
        height: hp(10),
        width: wp(20),

    },
    OrderView: {
        flexDirection: "row",
        marginVertical: hp(2),
        borderBottomWidth: 3,
        borderColor:"gray",
        overflow:"hidden",
        paddingBottom:hp(2)
    },
    OrderDetails: {
        flexDirection: "column",
        marginLeft: wp(2),
        flex: 1
    },
    Button: {
        width: wp(30),
        height: hp(5),
        marginVertical: hp(2),
        backgroundColor: "#EBEDF3",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf:"center",
        position:"static",
        bottom:hp(2)
    },
    ButtonText: {
        color: "#a1020a",
        fontWeight: "bold",
      },

    Error:{
        
        fontSize: hp(2),
        marginHorizontal: wp(1),
        color:"red"
    }
});
