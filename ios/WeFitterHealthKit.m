#import "WeFitterHealthKit.h"

@implementation WeFitterHealthKit
{
    bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
}

-(NSArray<NSString *> *)supportedEvents {
    return @[@"status-update"];
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(connect:(NSString *)token
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (WeFitter.canConnectToHealthData) {
        [WeFitter connectBearerToken:token completion:^(BOOL success, NSError * error) {
            if (success) {
                [self sendEventWithName:@"status-update" body:@{@"status": @"connected"}];
                resolve(@(true));
            } else {
                reject(@"Error connecting profile: %@", error.localizedDescription, error);
            }
        }];
    } else {
        reject(@"Cannot connect to HealthKit data", nil, nil);
    }
}

RCT_EXPORT_METHOD(disconnect) {
    [WeFitter disconnect];
    [self sendEventWithName:@"status-update" body:@{@"status": @"disconnected"}];
}

RCT_EXPORT_METHOD(getStatus) {
    if(hasListeners) {
        if ([WeFitter currentStatus] == StatusConnected) {
            [self sendEventWithName:@"status-update" body:@{@"status": @"connected"}];
        } else {
            [self sendEventWithName:@"status-update" body:@{@"status": @"disconnected"}];
        }
    }
}

@end
