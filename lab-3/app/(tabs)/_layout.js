import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Rețete online",
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: "Rețetele mele",
        }}
      />
    </Tabs>
  );
}
