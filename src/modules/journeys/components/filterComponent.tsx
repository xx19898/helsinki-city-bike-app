import RangeSlider from "~/common/components/rangeSlider/rangeSlider"



export default () => {

    return(
        <section className="w-full h-auto bg-AirForceBlue flex flex-col justify-center items-center">
            <RangeSlider max={1000} min={0} valueCallback={(val:number) => console.log(val)}/>
        </section>
    )
}