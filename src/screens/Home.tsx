import {
  Heading,
  Icon,
  IconButton,
  Text,
  useTheme,
  VStack,
  HStack,
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../assets/logo_secondary.svg";

import Filter, { IFilterProps } from "../components/Filter";

export default function Home() {
  const { colors } = useTheme();

  const [statusSelected, setStatusSelected] =
    useState<IFilterProps["type"]>("open");

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
            isActive={statusSelected === "close"}
            onPress={() => setStatusSelected("close")}
          />
        </HStack>
      </VStack>
    </VStack>
  );
}
