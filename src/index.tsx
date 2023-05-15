import { NativeModules } from 'react-native';

export enum WeFitterHealthKitDataType {
  ActiveEnergyBurned,
  BasalEnergyBurned,
  BloodGlucose,
  BloodPressureDiastolic,
  BloodPressureSystolic,
  BodyFatPercentage,
  BodyMass,
  BodyMassIndex,
  BodyTemperature,
  DistanceCycling,
  DistanceDownhillSnowSports,
  DistanceSwimming,
  DistanceWalkingRunning,
  DistanceWheelchair,
  Electrocardiogram, // only available iOS 14+
  HeartRate,
  HeartRateVariabilitySDNN,
  Height,
  MindfulSession,
  OxygenSaturation,
  RestingHeartRate,
  SleepAnalysis,
  StepCount,
  Vo2Max,
  Workout,
}

type WeFitterHealthKitType = {
  configure(config: {
    token: string;
    url?: string;
    startDate?: string;
    enabledDataTypes?: WeFitterHealthKitDataType[];
  }): Promise<void>;
  connect(): Promise<void>;
  disconnect(): void;
  canConnectToHealthData(callback: (supported: boolean) => void): void;
  getConnectedProfileId(callback: (id: string) => void): void;
  getStatus(): void;
};

const { WeFitterHealthKit } = NativeModules;

export default WeFitterHealthKit as WeFitterHealthKitType;
