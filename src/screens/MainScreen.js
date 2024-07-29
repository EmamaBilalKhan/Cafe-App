import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { memo } from 'react';
import { collection, getDocs} from "firebase/firestore";
import { db } from './Firebase';
import Products from '../components/Products';

export default function MainScreen({navigation}){
    const [locationtext,setlocationtext]=useState("Allama iqbal town");
    const [SearchText,setSearchText]=useState("");
    const [SelectedCategory, setSelectedCategory]= useState("Coffee");
    const [Menu, setMenu] = useState([]);
    const [isDataLoading, setisDataLoading] = useState(true)

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
        try{
        const data = await fetchData(Category);
        console.log(data);
        setMenu(data);
        setisDataLoading(false);  
    }
        catch(error){
            console.log("error: ", error)
        }
      }

      const fetchData = async (Category) =>{
        const CollectionRef = collection(db, Category);
        const querySnapshot = await getDocs(CollectionRef);
    
        const selectedMenu = querySnapshot.docs.map(doc => ({
            id: doc.id,
          ...doc.data(),
        }));
        return selectedMenu;
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
            <View style={styles.container}>
                <TouchableOpacity style={styles.mapstyle} >
                  <Entypo name="location-pin" size={hp(3)} color="#74512D" style={styles.locationpin} />
                  <Text style={styles.locationtext}>{locationtext}</Text>
                </TouchableOpacity>
                <View style={styles.mapend}></View>
                <View style={styles.search}>
                   <Feather name="search" size={21} color="black" style={styles.searchicon} />
                    <TextInput style={styles.searchinput} placeholder='Search'
                            value={SearchText}
                            onChangeText={(text) => setSearchText(text)}></TextInput>
                </View>
                <Text style={styles.categoryText}>Categories</Text>
                <View style={styles.category}>
                    <MyTouchableOpacity category="Coffee" onPress={() => handleSelectedCategory("Coffee")} style={styles.categoryButton} />
                    <MyTouchableOpacity category="Dessert" onPress={() => handleSelectedCategory("Dessert")} style={styles.categoryButton} />
                </View>
                {!isDataLoading && <Products menu={Menu}/>}
                <View>
 
</View>
            </View>
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
        marginVertical:hp(2),
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
    }
})