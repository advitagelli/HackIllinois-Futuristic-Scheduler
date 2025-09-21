import React from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';

// tanstack query client
const queryClient = new QueryClient();

const AppDefaultStyle = {
  background: '#001B3A',
  primary: '#00FFFF',
};

export default function RootLayout() {
  // react hook
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ffff" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: AppDefaultStyle.background,
          },
          headerTintColor: AppDefaultStyle.primary,
          headerTitleStyle: {
            fontFamily: 'Orbitron_700Bold',
            color: AppDefaultStyle.primary,
          },
          headerTitleAlign: 'center',
          headerLargeTitle: true,
        }}>

        <Stack.Screen
          name="index"
          options={{ title: 'SCHEDULE' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}