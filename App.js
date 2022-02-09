import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import { ImagePickerModal } from './src/components/ImagePickerModal';
import { ImagePickerAvatar } from './src/components/ImagePickerAvatar';
import { AzureOCRService } from './src/services';

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import firebaseConfig from './src/firebase/firebaseConfig.js'

initializeApp(firebaseConfig);

const App = () => {

  const [pickerResponse, setPickerResponse] = useState(null)
  const [visible, setVisible] = useState(false)

  const [ocrData, setOcrData] = useState([]);

  useEffect(() => {
    return () => {
      setOcrData([])
    }
  }, [pickerResponse])

  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }
    const result = await ImagePicker.launchImageLibrary(options, setPickerResponse);
    console.log("ressssssssssssss", result.assets[0].uri)
    setVisible(false)
    if (!result.didCancel) {
      uploadToFirebase(result);
    }
  }, [])

  const onCameraPress = React.useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await ImagePicker.launchCamera(options, setPickerResponse);
    if (!result.didCancel) {
      uploadToFirebase(result);
    }
  }, []);

  const uploadToFirebase = async (file) => {
    const storage = getStorage(); //the storage itself
    const _ref = ref(storage, 'images/image.jpg'); //how the image will be addressed inside the storage

    //convert image to array of bytes
    const img = await fetch(file.assets[0].uri);
    const bytes = await img.blob();

    try {
      await uploadBytes(_ref, bytes); //upload images
      getURLandProcess();
    } catch (error) {
      console.log('error while upload')
    }
  }

  const getURLandProcess = async () => {
    const storage = getStorage();
    await getDownloadURL(ref(storage, 'images/image.jpg'))
      .then((url) => {
        // `url` is the download URL for 'images/image.jpg
        console.log("url of image>>>", url)
        AzureOCRService(url).then((res) => {
          res.ok ? setOcrData(res.data) : setOcrData([]);
        });

      })
      .catch((error) => {
        // Handle any errors
        console.log("error while getting url")
      });
  }

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <View style={styles.container}>
      <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
      <View style={styles.resultsContainer}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{ocrData.length > 0 ? ocrData.map((line) => {
          return (
            <Text key={line.words.text}>
              {line.words.map((words) => {
                return " " + words.text;
              })}
            </Text>
          );
        }) : 'result will show here...'}
        </Text>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  resultsContainer: {
    width: 350,
    height: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#213B71',
    borderRadius: 10,
    elevation: 7
  }
});

export default App;
