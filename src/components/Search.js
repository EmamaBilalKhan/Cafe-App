import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';

export default function SearchResults ({ searchQuery, menu, navigation })
{
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const results = menu.filter((item) =>
        item.Name.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <View style={styles.resultView}>
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen', {item: result}, {navigation:navigation})} key={index} style={{ flexDirection: 'row', marginBottom:hp(1)}}>
            <Image source={{ uri: result.Image }} style={{ width: wp(10), height: hp(8) }} />
            <Text style={{ fontSize: hp(1.5), marginLeft: wp(2), fontWeight:"bold"}}>{result.Name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No results found</Text>
      )}
    </View>
  );
};
const styles= StyleSheet.create({
    resultView:{
        width: wp(90),
        marginHorizontal:wp(5),
        paddingTop: wp(1),
        borderColor:"black",
        borderWidth:1,
        paddingLeft: wp(2),
        borderRadius:15
    }
})