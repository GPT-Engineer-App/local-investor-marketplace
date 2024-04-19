import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const toast = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = `https://backengine-tydv.fly.dev/${isLoggingIn ? "login" : "signup"}`;
    const method = isLoggingIn ? "POST" : "POST";
    const body = JSON.stringify({ email, password });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: isLoggingIn ? "Login Successful" : "Signup Successful",
          description: isLoggingIn ? `Welcome back, ${email}` : `Account created for ${email}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // Here you would typically handle the login token, redirect, etc.
      } else {
        throw new Error("Failed to authenticate");
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <VStack spacing={8}>
          <Heading>{isLoggingIn ? "Login" : "Sign Up"}</Heading>
          <form onSubmit={handleAuth}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} colorScheme="blue" mt={4} type="submit">
              {isLoggingIn ? "Login" : "Sign Up"}
            </Button>
            <Text mt={4} onClick={() => setIsLoggingIn(!isLoggingIn)} cursor="pointer">
              {isLoggingIn ? "Need an account? Sign Up" : "Already have an account? Login"}
            </Text>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
