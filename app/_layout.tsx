import { Stack } from "expo-router";

interface DashboardParams {
    id: string;
  }

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard/roleta" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard/representante"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="dashboard/map" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard/[id]"
        options={({ route }) => {
          const params = route.params as DashboardParams; 
          return {
            headerTitle: `Representantes - ${params.id}`, 
          };
        }}
      />
    </Stack>
  );
}
