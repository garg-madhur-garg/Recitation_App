import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const UploadAudio = (props) => {
    const pickDocument = async () => {
        if (props.validateFields && !props.validateFields()) return;
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
          if (response.canceled == false) {
            // debugger
            // let { name, size } = response.assets[0].file;
            // let uri = response.assets[0].uri;
            
            let { name, size, uri } = response.assets[0];
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
              name: name,
              size: size,
              uri: uri,
              type: "application/" + fileType
            };
            // setDoc(fileToUpload);
            if(props.setAudioUri) props.setAudioUri(fileToUpload.uri);
            if(props.saveSloka) props.saveSloka(fileToUpload.uri);
          }else{
            console.log("Document picking cancelled", response);
            
          }
        });
        // console.log(result);
        // console.log("Doc: " + doc.uri);
      }
    return (
        <TouchableOpacity
                style={[
                styles.button, { marginBottom: 8, backgroundColor: '#3700B3' }
                ]}
                onPress={pickDocument}
            >
                <Text style={styles.buttonText}>
                📤 Upload Audio
                </Text>
            </TouchableOpacity>
    );
    };

const styles = StyleSheet.create({
    button: {
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
});

export default UploadAudio;