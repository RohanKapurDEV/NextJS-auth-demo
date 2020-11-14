import React from "react";
import { Flex } from "@chakra-ui/react";

export default function FlexContainer({ children }) {
  return (
    <>
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
}
