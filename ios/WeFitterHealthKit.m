#import "WeFitterHealthKit.h"

@implementation WeFitterHealthKit {
    bool hasListeners;
}

// Will be called when this module's first listener is added.
- (void)startObserving {
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
- (void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString*>*)supportedEvents {
    return @[ @"status-update" ];
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(configure : (NSDictionary*)config resolver : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject) {
    NSString* token = config[@"token"];
    NSString* url = config[@"url"];
    NSString* startDateString = config[@"startDate"];
    NSArray* enabledDataTypes = config[@"enabledDataTypes"];
    BOOL enableDailyDetail = [config[@"enableDailyDetail"] boolValue];
    BOOL enableHeartRateSamples = [config[@"enableHeartRateSamples"] boolValue];

    // convert NString to NSDate
    NSDate* startDate = nil;
    if (startDateString != nil) {
        NSDateFormatter* dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateFormat:@"yyyy-MM-dd"];
        startDate = [dateFormatter dateFromString:startDateString];
    }

    WeFitterConfig* wefitterConfig = [[WeFitterConfig alloc] initWithToken:token url:url startDate:startDate enabledDataTypes:enabledDataTypes enableDailyDetail:enableDailyDetail enableHeartRateSamples:enableHeartRateSamples];

    [WeFitter configure:wefitterConfig
             completion:^(BOOL success, NSError* error) {
               if (success) {
                   if (self->hasListeners) {
                       [self sendEventWithName:@"status-update" body:@{@"status" : @"configured"}];
                   }
                   resolve(nil);
               } else {
                   reject(@"configure", error.localizedDescription, error);
               }
             }];
}

RCT_EXPORT_METHOD(connect : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject) {
    [WeFitter connect:^(BOOL success, NSError* error) {
      if (success) {
          if (self->hasListeners) {
              [self sendEventWithName:@"status-update" body:@{@"status" : @"connected"}];
          }
          resolve(nil);
      } else {
          reject(@"connect", error.localizedDescription, error);
      }
    }];
}

RCT_EXPORT_METHOD(disconnect) {
    [WeFitter disconnect];
    if (hasListeners) {
        [self sendEventWithName:@"status-update" body:@{@"status" : @"disconnected"}];
    }
}

RCT_EXPORT_METHOD(canConnectToHealthData : (RCTResponseSenderBlock)callback) { callback(@[ @(WeFitter.canConnectToHealthData) ]); }

RCT_EXPORT_METHOD(getConnectedProfileId : (RCTResponseSenderBlock)callback) { callback(@[ WeFitter.connectedProfileId ]); }

RCT_EXPORT_METHOD(getStatus) {
    if (hasListeners) {
        switch (WeFitter.currentStatus) {
            case StatusConnected:
                [self sendEventWithName:@"status-update" body:@{@"status" : @"connected"}];
                break;
            case StatusDisconnected:
                [self sendEventWithName:@"status-update" body:@{@"status" : @"disconnected"}];
                break;
            case StatusNotConfigured:
                [self sendEventWithName:@"status-update" body:@{@"status" : @"not-configured"}];
                break;
        }
    }
}

@end
