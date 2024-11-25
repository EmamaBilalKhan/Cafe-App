import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { memo } from 'react';
import Products from '../components/Products';
import Search from '../components/Search';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore} from '../Store/Store';
import { auth } from './Firebase';
export default function MainScreen({navigation}){
    const [SearchText,setSearchText]=useState("");
    const [SelectedCategory, setSelectedCategory]= useState("Coffee");
    const [Menu, setMenu] = useState([]);
    const [ErrorFetching, setErrorFetching] = useState(false);
    const [isDataLoading, setisDataLoading] = useState(true)
    const location = useProductStore((state) => state.Location);
    const IP = useProductStore(state=>state.IP);
    const getCategoryStyle = (category) => {
        const isSelected = category === SelectedCategory;
        return {
          backgroundColor: isSelected ? '#74512D' : 'white', 
        };
      };
      const getCategoryTextStyle = (category) => {
        const isSelected = category === SelectedCategory;
        return {
          color: isSelected ? 'white' : '#74512D',
          fontWeight:"bold"
        };
      };

      const handleSelectedCategory= async(Category)=>{
        setSelectedCategory(Category);
        setErrorFetching(false); 
        setisDataLoading(true); 
        try{
        const data = await fetchData(Category);
        if (data==="Error"){
          setErrorFetching(true);
          return;
        }
        setMenu(data);
        setisDataLoading(false);  
    }
        catch(error){
            console.log("error: ", error);
            setErrorFetching(true);
        }
      }

      const fetchData = async (Category) =>{
        const user = auth.currentUser;
        const idToken = await user.getIdToken();
        try{
        const response = await fetch(`http://${IP}:3000/${Category}_Products`,{
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${idToken}`
          }
        });
        const selectedMenu = await response.json();
        return selectedMenu;}
        catch(error){
            console.log("error: ", error)
            return "Error";
        }
      }



    const MyTouchableOpacity = memo(({ category,onPress}) => (
        <TouchableOpacity onPress={onPress} style={[styles.categoryButton, getCategoryStyle(category)]}>
          <Text style={getCategoryTextStyle(category)}>{category}</Text>
        </TouchableOpacity>
      ));
    
    useEffect( () => {
        handleSelectedCategory('Coffee');
      }, []);
     
    return(
        <> 
        <StatusBar barStyle="dark-content" backgroundColor="white"/>
        <SafeAreaView style={styles.container}>
            
                <TouchableOpacity style={styles.mapstyle} onPress={()=>navigation.navigate(Map)}>
                  <Entypo name="location-pin" size={hp(3)} color="#74512D" style={styles.locationpin} />
                  <Text style={styles.locationtext}>{location}</Text>
                </TouchableOpacity>
                <View style={styles.mapend}></View>
                <View style={styles.search}>
                   <Feather name="search" size={21} color="black" style={styles.searchicon} />
                    <TextInput style={styles.searchinput} placeholder='Search'
                            value={SearchText}
                            onChangeText={(text) => setSearchText(text)}></TextInput>
                  
                </View>
                {SearchText !== '' && (
                <Search searchQuery={SearchText} menu={Menu} navigation={navigation} />)}
                <Text style={styles.categoryText}>Categories</Text>
                <View style={styles.category}>
                    <MyTouchableOpacity category="Coffee" onPress={() => handleSelectedCategory("Coffee")} style={styles.categoryButton} />
                    <MyTouchableOpacity category="Dessert" onPress={() => handleSelectedCategory("Dessert")} style={styles.categoryButton} />
                </View>
                {!isDataLoading && <Products menu={Menu} navigation={navigation}/>}
                {ErrorFetching && <Text style={styles.LoadText}>Error Loading Data</Text>}
                {isDataLoading && <Text style={styles.LoadText}>Loading Data</Text>}

                <View>
 
</View>
            
            </SafeAreaView>
        </>
    );


    
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
        alignItems:"center"
    },
    mapstyle:{
        marginVertical: hp(1),
        paddingVertical:hp(1),
        width: wp(100),
        flexDirection:"row",
        
    },
    locationpin:{
        marginHorizontal: wp(2),
        
    },
    locationtext:{
        fontWeight:"bold",
        color:"#74512D",
        fontSize:hp(2),
        paddingtop:hp(1),
        flexWrap:"wrap",
        marginRight:wp(1)
    },
    mapend:{
        backgroundColor: "#D8D9DA",
        width:wp(100),
        height:0.8
    },
    search:{
        height: hp(5),
        width: wp(90),
        marginHorizontal:wp(5),
        paddingLeft: wp(2),
        borderRadius: 20,
        flexDirection:"row",
        borderColor:"black",
        marginTop:hp(2),
        marginBottom:hp(1),
        borderWidth:1
    },
    searchinput:{
        marginHorizontal:wp(1),
        paddingLeft: wp(2),
        width:wp(100)
    },
    searchicon:{
        paddingTop:hp(1),
    },
    categoryText:{
    fontWeight:"bold",
    color:"#74512D",
    fontSize: hp(3),
    marginBottom:hp(2),
    marginTop: hp(1),
    marginHorizontal:wp(5)
    },
    category:{
        flexDirection: "row",
        height: hp(5),
        marginHorizontal:wp(5),
        marginVertical: hp(2)

    },
    categoryButton:{
        width:wp(40),
            height: hp(5),
            borderRadius: 20,
            borderColor:"#74512D",
            borderWidth:2,
            alignItems:"center",
            justifyContent:"center",
            marginHorizontal:wp(5),
            fontWeight:"bold"
    },
    LoadText:{
        fontWeight:"bold",
        fontSize: hp(1.8),
        marginVertical:hp(2),
        marginHorizontal:wp(5)
    }
})