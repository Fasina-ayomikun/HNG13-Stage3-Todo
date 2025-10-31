import {
  ConvexProvider,
  ConvexReactClient,
} from "convex/dist/cjs/react/index.js";
import React from "react";

const url = process.env.EXPO_PUBLIC_CONVEX_URL!;
console.log("Convex URL:", url); // should log the vibrant-bandicoot-628 URL in your Metro console

const client = new ConvexReactClient(url);

export default function ConvexCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
