
const Hero = () => {
    return (
        <div className="flex flex-col mt-1 sm:flex-row border border-gray-400 [border-top-right-radius:50px] [border-bottom-left-radius:50px]" >
            {/* Hero Left Section */}

            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0" >
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2" >
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] " ></p>
                        <p className="font-medium text-sm md:text-base " >OUR BESTSELLERS</p>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] " ></p>
                    </div>
                    <h1 className=" prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Products</h1>
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            {/* Hero Right Section */}
            <img
                src="https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-sari/b/y/p/free-black-saree-shayonam-unstitched-original-imah4eb76r8tzvka.jpeg?q=70"
                className="w-full h-[300px] sm:h-[450px] sm:w-1/2 [border-top-right-radius:50px] "
            />

        </div>
    )
}

export default Hero