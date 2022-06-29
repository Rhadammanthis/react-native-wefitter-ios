import { NativeModules } from 'react-native';

type WeFitterHealthKitType = {
  configure(config: {
    token: string;
    url?: string;
    startDate?: string;
  }): Promise<void>;
  connect(): Promise<void>;
  disconnect(): void;
  canConnectToHealthData(callback: (supported: boolean) => void): void;
  getConnectedProfileId(callback: (id: string) => void): void;
  getStatus(): void;
};

const { WeFitterHealthKit } = NativeModules;

export default WeFitterHealthKit as WeFitterHealthKitType;
