# react-native-wefitter-ios

React Native library for integrating WeFitter and HealthKit into your app.

## Installation

```sh
yarn add git://github.com/ThunderbyteAI/react-native-wefitter-ios.git#v0.2.0
```

In Xcode for your target:

- Set the minimum deployment target to at least iOS 11.3
- Add `HealthKit` in `Signing & Capabilities` and enable `Background Delivery`
- Add `Privacy - Health Share Usage Description` in `Info` with an appropriate message
- Add `Privacy - Health Update Usage Description` in `Info` with an appropriate message
- Add an Objective-C bridging header file

Add the following to `AppDelegate.m` and change `YOUR_API_URL`:

```objective-c
#import <WeFitterLib/WeFitterLib.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...

  // Begin setup WeFitter
  WeFitterConfig *config = [[WeFitterConfig alloc] initWithUrl:@"YOUR_API_URL" clientId:@"" clientSecret:@"" startDate:nil];
  NSError *error;
  BOOL success = [WeFitter setupWithConfig:config error:&error];
  if (!success) {
      NSLog(@"Error setting up WeFitter: %@", error.localizedDescription);
  }
  // End setup WeFitter

  return YES;
}
```

The url should be base without `v1/ingest/` as the plugin will append this. For example: `https://api.wefitter.com/api/`.

By default data of the past 7 days will be uploaded. To override this you can pass a `startDate`.

## Usage

Add the following code and change `YOUR_TOKEN`:

```ts
import WeFitterHealthKit from 'react-native-wefitter-ios';

// ...

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
```

See the [example](example/src/App.tsx) for the full source.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
