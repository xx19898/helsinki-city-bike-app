import gsap from "gsap";
import { EasePack } from "gsap/all"
import { RefObject, useEffect, useRef } from "react";

interface IUseAnimatedHeader{
    helsinkiRef: RefObject<SVGTextElement>,
    cityRef: RefObject<SVGTextElement>,
    theRef: RefObject<SVGTextElement>,
    toRef: RefObject<SVGTextElement>,
    bikeRef: RefObject<SVGTextElement>,
    appRef: RefObject<SVGTextElement>,
    welcomeRef: RefObject<SVGTextElement>
}

export default ({helsinkiRef,appRef,bikeRef,cityRef,theRef,toRef,welcomeRef}:IUseAnimatedHeader) => {
    const tl = useRef<GSAPTimeline>()
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({defaults:{duration:0.5,autoAlpha:0,ease:EasePack.RoughEase}})
            .from(welcomeRef.current,{y:'-50vh'}).from(toRef.current,{y:'-50vh'}).from(theRef.current,{y:'-100vh'}).from(bikeRef.current,{y:'-100vh'}).from(appRef.current,{y:'-100vh'}).from(helsinkiRef.current,{x:'-100vw'},"0.5").from(cityRef.current,{x:'-100vw'},"0.8")
        })
        return () => ctx.revert()
    },[])   
}