import { NativeModules } from 'react-native';

export enum WeFitterHealthKitDataType {
  ActiveEnergyBurned,
  AppleExerciseTime,
  AppleMoveTime, // only available iOS 14.5+
  BasalEnergyBurned,
  BloodGlucose,
  BloodPressureDiastolic,
  BloodPressureSystolic,
  BodyFatPercentage,
  BodyMass,
  BodyMassIndex,
  BodyTemperature,
  CyclingCadence, // only available iOS 17+
  CyclingPower, // only available iOS 17+
  CyclingSpeed, // only available iOS 17+
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
  RunningPower, // only available iOS 16+
  RunningSpeed, // only available iOS 16+
  SleepAnalysis,
  StairAscentSpeed, // only available iOS 14+
  StairDescentSpeed, // only available iOS 14+
  StepCount,
  Vo2Max,
  WalkingSpeed, // only available iOS 14+
  Workout,
}

type WeFitterHealthKitType = {
  configure(config: {
    token: string;
    url?: string;
    startDate?: string;
    enabledDataTypes?: WeFitterHealthKitDataType[];
    enableDailyDetail?: boolean;
    enableHeartRateSamples?: boolean;
  }): Promise<void>;
  connect(): Promise<void>;
  disconnect(): void;
  canConnectToHealthData(callback: (supported: boolean) => void): void;
  getConnectedProfileId(callback: (id: string) => void): void;
  getStatus(): void;
};

const { WeFitterHealthKit } = NativeModules;

export default WeFitterHealthKit as WeFitterHealthKitType;
