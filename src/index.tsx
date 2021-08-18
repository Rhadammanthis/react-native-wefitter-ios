import { NativeModules } from 'react-native';

type WeFitterHealthKitType = {
  connect(token: string): void;
  disconnect(): void;
  getStatus(): void;
};

const { WeFitterHealthKit } = NativeModules;

export default WeFitterHealthKit as WeFitterHealthKitType;
