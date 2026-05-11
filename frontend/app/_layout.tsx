import '../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="result" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="wrapped" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="expense-logger" options={{ presentation: 'modal' }} />
      <Stack.Screen name="spin" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
