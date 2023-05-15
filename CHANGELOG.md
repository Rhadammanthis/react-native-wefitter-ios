# Changelog

## 1.5.1

Added `enabledDataTypes` to `config` to control which permissions should be requested

## 1.4.1

Reduced amount of ingest calls

Added "Version" header to ingest call

## 1.4.0

Added sleep stages on iOS 16+

Changed default start date from 7 to 20 days back

Force data refresh

## 1.3.0

Added more detailed heart rate data to workouts

## 1.2.0

Added basal and active energy burned to daily summaries

## 1.1.0

Added daily detail samples per 15 minutes containing steps, distance and energy

Added end date to heart rate samples

Fixed `HKElectrocardiogramQuery` symbol not found crash on devices before iOS 14

## 1.0.0

Updated WeFitter API version to 1.3

Enabled background delivery for all supported datatypes

Added `configure`, `canConnectToHealthData` and `getConnectedProfileId`

Added `not-configured` status event

BREAKING CHANGE:

Removed param from `connect`

## 0.2.1

Fixed bug preventing upload of daily summaries

Fixed bug that caused zero values in daily summaries

## 0.2.0

Added heart rate samples per 15 minutes

Added ECG

## 0.1.0

Expanded daily summaries to include minimum, maximum, average and resting heart rate

Added the following datatypes:

- Blood glucose
- Systolic blood pressure
- Diastolic blood pressure
- Body fat percentage
- Body temperature
- Oxygen saturation
- HRV
- VO2max

## 0.0.1

First version
