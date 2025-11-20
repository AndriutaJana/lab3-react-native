import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
  //   "/", redirecționează spre tab-ul cu rețete
  return <Redirect href="/(tabs)/recipes" />;
}
