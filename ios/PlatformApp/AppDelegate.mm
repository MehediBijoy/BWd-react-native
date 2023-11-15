#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

// React native splash screen
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"PlatformApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  //This is previous code without react native splash screen
  // return [super application:application didFinishLaunchingWithOptions:launchOptions];


  // React native splash screen
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNSplashScreen show];  
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
