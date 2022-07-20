import { useRoute } from "@react-navigation/native";
import { VStack } from "native-base";

import Header from "../components/Header";

import { DetailsParams } from "../@types/routeParams";

interface RouteParams extends DetailsParams {}

export default function Details() {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} p={6} bg="gray.700">
      <Header title="Solicitação" />
    </VStack>
  );
}
