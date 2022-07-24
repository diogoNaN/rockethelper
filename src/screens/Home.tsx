import { Alert } from "react-native";
import { useEffect, useState } from "react";
import {
  Heading,
  IconButton,
  Text,
  useTheme,
  VStack,
  HStack,
  FlatList,
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import Logo from "../assets/logo_secondary.svg";

import Filter from "../components/Filter";
import Button from "../components/Button";
import Loading from "../components/Loading";
import EmptyOrders from "../components/EmptyOrders";
import Order, { OrderProps } from "../components/Order";

import firestoreDateFormat from "../utils/firestoreDateFormat";

import Status from "../@types/status";

export default function Home() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [statusSelected, setStatusSelected] = useState<Status>("open");
  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handleLogout() {
    auth()
      .signOut()
      .catch((err) => {
        return Alert.alert("Ops", "Falha ao sair");
      });
  }

  function handleCreateOrder() {
    navigate("Create");
  }

  function handleOpenDetails(orderId: string) {
    navigate("Details", { orderId });
  }

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { id } = doc;
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id,
            patrimony,
            description,
            status,
            when: firestoreDateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return unsubscribe;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w={"full"}
          justifyContent="space-between"
          alignItems={"center"}
          mt={8}
          mb={4}
        >
          <Heading color={"gray.100"}>Meus chamados</Heading>

          <Text color={"gray.200"}>{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            isActive={statusSelected === "open"}
            onPress={() => setStatusSelected("open")}
          />
          <Filter
            title="finalizados"
            type="closed"
            isActive={statusSelected === "closed"}
            onPress={() => setStatusSelected("closed")}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <EmptyOrders statusSelected={statusSelected} />
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleCreateOrder} />
      </VStack>
    </VStack>
  );
}
