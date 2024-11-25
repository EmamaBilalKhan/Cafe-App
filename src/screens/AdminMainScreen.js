import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TouchableOpacity, Text, ScrollView, StyleSheet, View } from 'react-native';
import { auth } from './Firebase';
import { useEffect, useState } from 'react';
import { useProductStore } from '../Store/Store';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function AdminMainScreen() {
  const [orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const IP = useProductStore((state) => state.IP);
  const navigation = useNavigation();

  const getTimeFromTimestamp=(timestamp)=> {
    
    const date = new Date(timestamp);
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  
    return `${hours}:${formattedMinutes} ${amPm}`;
  }
  

  const handleSignout = async () => {
    try {
      await auth.signOut();
      console.log("User Logged Out");
    } catch (error) {
      console.error("Log out error: ", error);
      setError("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated");
        const idToken = await user.getIdToken();
        const response = await fetch(`http://${IP}:3000/Orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
        const data = await response.json();
  
        const sortedOrders = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setOrders(sortedOrders);
        console.log("Sorted Orders: ", sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message || "Failed to get Orders");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.TopView}>
                <Text style={styles.TopText}>Orders</Text>
            </View>      
    <>{Loading ? (
        <Text style={styles.LoadingText}>Loading..</Text>
      ) : Error ? (
        <Text style={styles.LoadingText}>{Error}</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.LoadingText}>No Orders Available</Text>
      ) : (
        <ScrollView>
          {orders.map((order, index) => (
            <View key={order.id} style={styles.OrderView} >
                <View style={styles.orderIndexTimeView}>
                    <Text style={styles.orderIndexText}>{index+1}</Text>
                    <Text style={styles.orderTimestamp}>{getTimeFromTimestamp(order.timestamp)}</Text>
                </View>
                <View style={styles.orderTextsView}>
                    <Text style={styles.orderText}>Items ordered : {order.order.length}</Text>
                    <Text style={styles.orderText}>Total: ${order.total}</Text>
                </View>
                <Ionicons style={styles.orderNextIcom} name="arrow-forward-sharp" size={hp(4)} color="#74512D" onPress={()=>navigation.navigate("AdminOrderScreen",{Order:order})}/>
            </View>
          ))}
        </ScrollView>
      )}</>
      <TouchableOpacity onPress={handleSignout} style={styles.LogOutButton}>
        <Text style={styles.LogoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  LogOutButton: {
    width: wp(30),
    height: hp(5),
    marginVertical: hp(2),
    backgroundColor: "#EBEDF3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position:"static",
    bottom:hp(2)
  },
  LogoutText: {
    color: "#a1020a",
    fontWeight: "bold",
  },
  LoadingText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#74512D",
    alignSelf: "center",
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
    paddingVertical: hp(2),
    marginBottom:hp(2)
},
  OrderView:{
    borderRadius: 12,
    borderWidth: 3,
    borderColor:"#74512D",
    width: wp(96),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:wp(2),
    paddingVertical:hp(1),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  orderIndexText:{
    color:"gray",
    fontSize:hp(2.8),
    fontWeight:"bold",
    
  },
  orderTextsView:{
    width:wp(50),
    flexDirection:"column",
    marginLeft: wp(2)
  },
  orderText:{
    fontSize:hp(2.2),
    fontWeight:"bold",
  },
  orderNextIcom:{
    marginLeft:wp(2)
  },
  orderTimestamp:{
    fontSize:hp(1.8),
    fontWeight:"bold",
    color:"gray",
  },
  orderIndexTimeView:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    borderRightColor:"#d4d2cd",
    borderRightWidth:wp(1),
    paddingRight:wp(2),
    width: wp(22)
  }
});
