import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import {
  CircleWavyCheck,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from "phosphor-react-native";

import Input from "../components/Input";
import Header from "../components/Header";
import Button from "../components/Button";
import Loading from "../components/Loading";
import CardDetails from "../components/CardDetails";

import OrderFirestoreDTO from "../DTOs/OrderFirestoreDTO";

import firestoreDateFormat from "../utils/firestoreDateFormat";

import Order from "../@types/order";
import { DetailsParams } from "../@types/routeParams";

interface RouteParams extends DetailsParams {}

interface OrderMix extends Order, OrderFirestoreDTO {}

export default function Details() {
  const route = useRoute();
  const { colors } = useTheme();
  const { canGoBack, goBack } = useNavigation();

  const { orderId } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderMix | null>(null);
  const [solution, setSolution] = useState("");

  function handleOrderClose() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "informe a solução para poder encerrar a solicitação"
      );
    }

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "solicitação encerrada");
        canGoBack() && goBack();
      })
      .catch((error) => {
        Alert.alert("Solicitação", "não foi possível encerrar a solicitação");
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const { id } = doc;
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        setOrder({
          id,
          patrimony,
          description,
          status,
          solution,
          when: firestoreDateFormat(created_at),
          closed: closed_at ? firestoreDateFormat(closed_at) : null,
          created_at,
          closed_at,
        });

        setSolution(solution);

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          icon={DesktopTower}
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
        />

        <CardDetails
          icon={ClipboardText}
          title="descrição do problema"
          description={order.description}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          icon={CircleWavyCheck}
          title="solução"
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              h={24}
              textAlignVertical="top"
              multiline
              value={solution}
              onChangeText={setSolution}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose} />
      )}
    </VStack>
  );
}
