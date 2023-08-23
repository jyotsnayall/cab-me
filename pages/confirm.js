import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Map from './components/Map'
import { useRouter } from 'next/router'
import RideSelector from './components/RideSelector'
import Link from 'next/link'

const confirm = () => {
    const router = useRouter()
    const { pickup, dropoff } = router.query

    const [pickupCoordinates, setPickupCoordinates] = useState([0, 0])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0])

    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setPickupCoordinates(data.features[0].center)
            })
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
                limit: 1
            })
        )
            .then(response => response.json())
            .then(data => {
                setDropoffCoordinates(data.features[0].center)
            })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/search">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
            </ButtonContainer>

            <Map
                pickupCoordinates={pickupCoordinates}
                dropoffCoordinates={dropoffCoordinates}
            />

            <RideContainer>
                <RideSelector
                    pickupCoordinates={pickupCoordinates}
                    dropoffCoordinates={dropoffCoordinates}
                />

                <ConfimButtonContainer>
                    <ConfimButton>
                        Confirm UberX
                    </ConfimButton>
                </ConfimButtonContainer>
            </RideContainer>

        </Wrapper>
    )
}

export default confirm


const ConfimButton = tw.div`
    bg-black text-white my-4 mx-4 py-4 text-center
`

const ConfimButtonContainer = tw.div`
    border-t-2
`

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`

const Wrapper = tw.div`
    flex flex-col h-screen
`

const ButtonContainer = tw.div`
    rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer
`

const BackButton = tw.img`
    h-full object-contain
`