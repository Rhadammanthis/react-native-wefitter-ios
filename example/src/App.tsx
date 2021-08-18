import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeEventEmitter,
  NativeModules,
  Button,
  Platform,
  Alert,
} from 'react-native';
import WeFitterHealthKit from 'react-native-wefitter-ios';

export default function App() {
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // create native event emitter and event listener to handle status updates
      const emitter = new NativeEventEmitter(NativeModules.WeFitterHealthKit);
      const listener = emitter.addListener('status-update', (event) =>
        // handle status update result
        // `event.status` can be `connected` or `disconnected`
        setConnected(event.status === 'connected')
      );
      // request status update which the listener will receive
      WeFitterHealthKit.getStatus();
      return () => listener.remove();
    }
    return;
  }, []);

  const onPressConnectOrDisconnect = () => {
    if (Platform.OS === 'ios') {
      connected
        ? WeFitterHealthKit.disconnect()
        : WeFitterHealthKit.connect('YOUR_TOKEN');
    } else {
      Alert.alert(
        'Not supported',
        'WeFitterHealthKit is not supported on Android'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Connected: {'' + connected}</Text>
      <Button
        onPress={onPressConnectOrDisconnect}
        title={connected ? 'Disconnect' : 'Connect'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
