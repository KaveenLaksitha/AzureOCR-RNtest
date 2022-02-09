import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export function ImagePickerAvatar({ uri, onPress }) {
  return (
    <View style={styles.avatar}>
      <Image
        style={styles.avatarImage}
        // source={uri ? { uri } : require('../assets/avatar.png')}
        source={uri ? { uri } : require('../assets/bg.jpg')}
      />
      <TouchableOpacity style={styles.btn} onPress={onPress} >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>Pick a image</Text>
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
  },
});
