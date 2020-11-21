import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Flex, Box, Button, Text, Stack, Heading, toast } from "@chakra-ui/react";
import FlexContainer from "../components/FlexContainer";

export default function Home() {
  const { authObject } = useAuth();

  return (
    <FlexContainer>
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" mt={8} textAlign="center">
            Welcome to the home page
          </Heading>
          <Text mt={8} textAlign="center">
            {`User ID: ${authObject.currentUser ? authObject.currentUser.uid : "no user signed in"}`}
          </Text>
          <Stack mt={8} alignItems="center" justifyContent="center" isInline width="100%">
            <Button variant="solid" variantColor="blue" width="100%" isDisabled={!authObject.currentUser}>
              <Link href="/authenticated">
                <a>Go to authenticated route</a>
              </Link>
            </Button>
            <Button variant="solid" variantColor="green" width="100%" isDisabled={authObject.currentUser}>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Button>
            <Button
              variant="solid"
              variantColor="green"
              width="100%"
              isDisabled={!authObject.currentUser}
              onClick={async () => {
                await authObject.logout().catch((error) => {
                  const message = error.message;
                  console.log(message);
                });
              }}
            >
              <a>Log out</a>
            </Button>
          </Stack>
          <br />
          <Button
            variant="solid"
            variantColor="green"
            width="100%"
            isDisabled={authObject.currentUser}
            onClick={async () => {
              await authObject.loginGoogle();
            }}
          >
            <a>Log in with Google</a>
          </Button>
          <br />
          <br />
          <Button
            variant="solid"
            variantColor="green"
            width="100%"
            isDisabled={authObject.currentUser}
            onClick={async () => {
              await authObject.loginGithub();
            }}
          >
            <a>Log in with Github</a>
          </Button>
        </Box>
      </Flex>
    </FlexContainer>
  );
}
