import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useProductStore } from '../Store/Store';

export default function Products(props) {
  const addToCart = useProductStore((state) => state.addToCart)
  const menu = Object.values(props.menu);

  return (
    <ScrollView contentContainerStyle={styles.productsView}>
      {menu.map((item, index) => {

        return (
          <TouchableOpacity key={item.id} style={styles.productView} onPress={()=>props.navigation.navigate('ProductDetailScreen', {item: item}, {navigation:props.navigation})}>
            <Image source={{ uri: item.Image }} style={styles.ProductImage} />
            <Text style={styles.ProductName}>{item.Name}</Text>
            <View style={styles.productDetailView}>
              <Text style={styles.productprice}>{item.Price}</Text>
              <AntDesign name="pluscircle" size={22} color="#74512D" style={styles.addlogo} onPress={()=>addToCart(item)}/>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp(90),
    justifyContent:"space-around"
  },
  productView: {
    width: wp(38), 
    height: hp(20),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom:hp(2),
    marginHorizontal:wp(2.5)
  },

  ProductImage: {
    height: hp(12),
    marginVertical: hp(0.5),
    width: wp(32),
    borderRadius:10
  },
  productDetailView: {
    flexDirection: 'row',
  },
  ProductName:{
    fontWeight:"500"
  },
  productprice:{
    fontSize: hp(1.8),
    fontWeight:"500",
    marginTop:hp(0.3)
  },
  addlogo:{
    marginLeft: wp(18),
    marginTop: hp(0.1)
  }
});
