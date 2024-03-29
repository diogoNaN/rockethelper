import { IButtonProps, Button as NativeBaseButton, Heading } from "native-base";

interface Props extends IButtonProps {
  title: string;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded={"sm"}
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color={"white"} fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}
