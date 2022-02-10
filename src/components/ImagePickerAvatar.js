import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function ImagePickerAvatar({ uri, onPress, isLoading, isDisabled }) {
  return (
    <View style={styles.avatar}>
      <Image
        style={styles.avatarImage}
        // source={uri ? { uri } : require('../assets/avatar.png')}
        source={uri ? { uri } : require('../assets/bg.jpg')}
      />
      <TouchableOpacity style={[styles.btn, { opacity: isDisabled ? 0.7 : 1 }]} onPress={onPress} disabled={isDisabled}>
        <ActivityIndicator size={30} color="#FFF" animating={isLoading} />
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18, marginLeft: 10 }}>{isDisabled ? 'Processing..' : 'Pick an Image'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: 10,
    elevation: 7,
    borderWidth: 0.5,
    borderColor: '#213B71',
  },
  avatarImage: {
    height: 400,
    width: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btn: {
    height: 40,
    width: 350,
    backgroundColor: '#213B71',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});
