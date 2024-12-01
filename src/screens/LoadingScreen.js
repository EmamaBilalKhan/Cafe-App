import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
//import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.LoadingText}>Loading...</Text>
      {/*<LottieView
        source={require('../../assets/Loading-Lottie.json')} 
        autoPlay
        loop
        style={styles.animation}
      />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: wp(50),
    height: hp(25),
  },
  LoadingText:{
    color:"#74512D",
    alignSelf:"center",
    fontWeight:"bold"
  }
});
