import { useEffect, useRef, useState } from "react"
import useAnimatedHeader from "../hooks/useAnimatedHeader"
import TextLogo from "~/modules/icons/textLogo"
import { init } from "next/dist/compiled/@vercel/og/satori"

export default () => {
    const [windowSize,setWindowSize] = useState<'small' | 'large' >()
    useEffect(() => {
        const initialWindowSize = window.innerWidth < 1024 ? 'small' : 'large'
        console.log({initialWindowSize})
    },[])
    useEffect(() => {
        addEventListener('resize',handleResize) 
        return () => {
            removeEventListener('resize',handleResize)
        }
    },[])
    const helsinkiRef = useRef<SVGTextElement>(null)
    const welcomeRef = useRef<SVGTextElement>(null)
    const toRef = useRef<SVGTextElement>(null)
    const theRef = useRef<SVGTextElement>(null)
    const bikeRef = useRef<SVGTextElement>(null)
    const appRef = useRef<SVGTextElement>(null)
    const cityRef = useRef<SVGTextElement>(null)

    useAnimatedHeader({helsinkiRef:helsinkiRef,welcomeRef:welcomeRef,toRef:toRef,theRef:theRef,bikeRef:bikeRef,appRef:appRef,cityRef:cityRef})
    
    return(
        <header className="w-auto h-auto relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-[2em]" data-name="Layer 1" height={windowSize == 'large' ? '40vw' : '80vw'} viewBox="0 0 307.99 360.62">
            <text ref={welcomeRef} id="welcome" fill="#091a26" fontFamily="Inter-Medium,Inter" fontSize="66" fontWeight="500" transform="translate(0 57)"><tspan letterSpacing="-.054em">W</tspan><tspan x="61.01" y="0">elcome </tspan></text>
            <text ref={toRef} id="to" fill="#091a26" fontFamily="Inter-Medium,Inter" fontSize="66" fontWeight="500" letterSpacing=".002em" transform="translate(225.74 116.02)">t<tspan x="24.69" y="0" letterSpacing=".008em">o</tspan></text>
            <text ref={theRef} id="the" fill="#091a26" fontFamily="Inter-Bold,Inter" fontSize="80" fontWeight="700" letterSpacing=".019em" transform="translate(161.71 178.76)">t<tspan x="32.63" y="0" letterSpacing=".008em">he</tspan></text>
            <text ref={bikeRef} id="bike" fill="#091a26" fontFamily="Inter-Bold,Inter" fontSize="80" fontWeight="700" letterSpacing=".008em" transform="translate(121.87 253.8)">Bi<tspan x="75.91" y="0" letterSpacing="-.015em">k</tspan><tspan x="121.26" y="0">e</tspan></text>
            <text ref={appRef} id="app" fill="#091a26" fontFamily="Inter-Bold,Inter" fontSize="80" fontWeight="700" letterSpacing=".008em" transform="translate(122.55 335.05)">App</text>
            <text ref={helsinkiRef} id="helsinki" fill="#ba1818" fontFamily="Inter-Bold,Inter" fontSize="60" fontWeight="700" transform="rotate(-90 195.61 142.89)">HELSINKI</text>
            <text ref={cityRef} id="city" fill="#ba1818" fontFamily="Inter-Bold,Inter" fontSize="60" fontWeight="700" transform="rotate(-90 155.385 33.295)">City</text>
        </svg>
        </header>
    )

    function handleResize(){
        console.log({windowSize:window.innerWidth})
        if(window.innerWidth < 1024) setWindowSize('small')
            else{
               setWindowSize('large')
            }
    }
}