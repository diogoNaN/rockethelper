import { useState } from "react";
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

import Logo from "../assets/logo_secondary.svg";

import Filter from "../components/Filter";
import Button from "../components/Button";
import EmptyOrders from "../components/EmptyOrders";
import Order, { OrderProps } from "../components/Order";

import Status from "../@types/status";

export default function Home() {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] = useState<Status>("open");
  const [orders, setOrders] = useState<OrderProps[]>([]);

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

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
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

          <Text color={"gray.200"}>3</Text>
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
            type="close"
            isActive={statusSelected === "closed"}
            onPress={() => setStatusSelected("closed")}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => {}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <EmptyOrders statusSelected={statusSelected} />
          )}
        />

        <Button title="Nova solicitação" />
      </VStack>
    </VStack>
  );
}
