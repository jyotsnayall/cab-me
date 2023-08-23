import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/')
            }
        })
    }, [])

    return (
        <Wrapper>
            <CabRoverLogo src='https://img.freepik.com/free-vector/city-driver-concept-illustration_114360-1209.jpg?w=1060&t=st=1692539303~exp=1692539903~hmac=5a079907fef70f75d2c94bd4679853adbd2c2755359f7633613b9ad8683930db' />
            <LoginContainer>
                <Title>Log in to access your account</Title>
                <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
                <SignInButton onClick={() => signInWithPopup(auth, provider)}>
                    Sign in with Google
                </SignInButton>
            </LoginContainer>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen w-screen bg-white p-4
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const CabRoverLogo = tw.img`
    h-20 w-auto object-contain self-end mt-10
`

const LoginContainer = tw.div`
    flex flex-col bg-gray-200 rounded-lg p-4  pb-10
`

const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

const HeadImage = tw.img`
    object-contain w-full
`