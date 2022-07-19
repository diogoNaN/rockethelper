import { useTheme, Text, Center } from "native-base";
import { ChatTeardropText } from "phosphor-react-native";

import Status from "../@types/status";

interface Props {
  statusSelected: Status;
}

export default function EmptyOrders({ statusSelected, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Center>
      <ChatTeardropText color={colors.gray[300]} size={40} />
      <Text color={"gray.300"} fontSize="xl" mt={6} textAlign="center">
        Você ainda não possui {"\n"}
        solicitações{" "}
        {statusSelected === "open" ? "em andamento" : "finalizadas"}
      </Text>
    </Center>
  );
}
