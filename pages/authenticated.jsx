import nookies from "nookies";
import { verifyIdToken } from "../utils/firebaseAdmin";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

export async function getServerSideProps(ctx) {
  try {
    const cookie = nookies.get(ctx);
    const token = await verifyIdToken(cookie.token);

    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    console.log(err);
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} };
  }
}

export default function Authenticated({ session }) {
  const { authObject } = useAuth();

  if (session) {
    return (
      <Flex>
        <Box w={500} p={4} my={12} mx="auto">
          <Heading as="h2" mb={12} textAlign="center">
            Authenticated
          </Heading>
          <Box>
            <Text textAlign="center">{session}</Text>
            <Text textAlign="center" mt={8}>
              You can now do anything you want in our application.
            </Text>
          </Box>
          <Box my={12} mx="auto" width="500px">
            <Button
              width="100%"
              variant="solid"
              variantColor="red"
              onClick={async () => {
                await authObject.logout();
                window.location.href = "/";
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Box>
        <Text>loading</Text>
      </Box>
    );
  }
}
