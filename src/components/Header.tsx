import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";

interface Props extends StyledProps {
  title: string;
}

export default function Header({ title, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <HStack
      w={"full"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg="gray.600"
      pt={12}
      pb={6}
      {...rest}
    >
      <IconButton icon={<CaretLeft size={24} color={colors.gray[200]} />} />

      <Heading
        flex={1}
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
