import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* detalii la reteta  */}
      <Stack.Screen
        name="recipe-details"
        options={{
          title: "Detalii rețetă",
          headerBackTitle: "Înapoi",
        }}
      />
    </Stack>
  );
}
