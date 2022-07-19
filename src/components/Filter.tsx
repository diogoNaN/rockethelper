import {
  IButtonProps,
  Button as NativeBaseButton,
  useTheme,
  Text,
} from "native-base";

import Status from "../@types/status";

interface FilterProps extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: Status;
}

export default function Filter({
  title,
  isActive = false,
  type,
  ...rest
}: FilterProps) {
  const { colors } = useTheme();

  const colorType = type === "open" ? colors.secondary[700] : colors.green[300];

  return (
    <NativeBaseButton
      variant={"outline"}
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bgColor="gray.600"
      flex={1}
      size={"sm"}
      {...rest}
    >
      <Text color={"white"} fontSize="sm" textTransform={"uppercase"}>
        {title}
      </Text>
    </NativeBaseButton>
  );
}

export type { FilterProps };
