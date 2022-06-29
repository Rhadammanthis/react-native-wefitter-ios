import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WeFitterHealthKit from 'react-native-wefitter-ios';

export default function App() {
  const [supported, setSupported] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      WeFitterHealthKit.canConnectToHealthData((supported) =>
        setSupported(supported)
      );
    }
  }, []);

  useEffect(() => {
    if (supported) {
      // Create native event emitter and event listener to handle status updates
      const emitter = new NativeEventEmitter(NativeModules.WeFitterHealthKit);
      const listener = emitter.addListener('status-update', (event) => {
        // Handle status update result
        switch (event.status) {
          case 'configured':
            break;
          case 'not-configured':
            break;
          case 'connected':
            setConnected(true);
            break;
          case 'disconnected':
            setConnected(false);
            break;
        }
      });
      // Request status update which the listener will receive
      WeFitterHealthKit.getStatus();

      let config = {
        token: 'YOUR_TOKEN', // required, WeFitter API profile bearer token
        url: 'CUSTOM_URL', // optional, the url should be base without `v1.3/ingest/` as the library will append this. Default: `https://api.wefitter.com/api/`
        startDate: 'CUSTOM_START_DATE', // optional with format `yyyy-MM-dd`, by default data of the past 7 days will be uploaded
      };

      // Configure should be called every time your app starts when HealthKit is supported
      WeFitterHealthKit.configure(config).catch((e) => console.log(e));

      return () => listener.remove();
    }
    return;
  }, [supported]);

  const onPressConnectOrDisconnect = () => {
    if (supported) {
      // Connect can be called after configure has succeeded
      connected
        ? WeFitterHealthKit.disconnect()
        : WeFitterHealthKit.connect().catch((e) => console.log(e));
    } else {
      Alert.alert(
        'Not supported',
        'WeFitterHealthKit is not supported on this device'
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
