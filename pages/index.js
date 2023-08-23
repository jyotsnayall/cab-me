import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import tw from "tailwind-styled-components"
import Map from './components/Map'
// import logo from '../assets/logo.png'
import Link from 'next/link'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        })
      } else {
        setUser(null)
        router.push('/login')
      }
    })
  })


  return (
    <div>
      <Wrapper>
        <Map />
        <ActionItems>
          <Header>
            <CabRoverLogo src='https://img.freepik.com/free-vector/city-driver-concept-illustration_114360-1209.jpg?w=1060&t=st=1692539303~exp=1692539903~hmac=5a079907fef70f75d2c94bd4679853adbd2c2755359f7633613b9ad8683930db' />
            <Profile>
              <Name>{user && user.name}</Name>
              <UserImage
                src={user && user.photoURL}
                onClick={() => signOut(auth)}
              />
              {/* <UserImage src='https://i.quotev.com/7indqg323tva.jpg' /> */}
              {/* <UserImage src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1692539607~exp=1692540207~hmac=a2bc241845d51252a1b10de888d41d870cd67e095a8a46fd1c16621495357afc' /> */}
              {/* https://img.freepik.com/premium-vector/brunette-man-avatar-portrait-young-guy-vector-illustration-face_217290-1035.jpg?w=740 */}
            </Profile>
          </Header>

          {/* Action Buttons */}
          <ActionButtons>
            <Link href="/search">
              <ActionButton>
                <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
                Ride
              </ActionButton>
            </Link>

            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
              Wheels
            </ActionButton>

            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </ActionButton>
          </ActionButtons>

          <InputButton>
            Where to?
          </InputButton>


        </ActionItems>
      </Wrapper>
    </div>
  )
}

const Wrapper = tw.div`
  flex flex-col h-screen
`

const ActionItems = tw.div`
  flex-1 p-4 bg-white
`
const Header = tw.div`
  flex justify-between items-center
`

const CabRoverLogo = tw.img`
  h-28
`

const Profile = tw.div`
  flex items-center
`

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border-gray-200 p-px cursor-pointer
`

const ActionButtons = tw.div`
  flex mt-4
`

const ActionButton = tw.button`
  bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 transition transition text-xl
`

const ActionButtonImage = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`