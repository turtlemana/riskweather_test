/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';

import Image from 'next/image';
import useWindowDimensions from '../public/useWindowDimensions';


const Learn=()=>{

    
    return (
        <div className={`min-h-screen`}>
            <Header/>
            
            {/* Main banner */}
            <div className={`h-400 mb-16 bg-gray-100`}>
                <div className={`wrap2 h-full flex items-center justify-between relative max-[450px]:wrap3`}>
                    <div className={`w-96 lg:w-34vw`}>
                        <h1 className={`text-2 font-bold`}>How to use Risk weather</h1>
                        <p className={`text-5 mb-2`}>Welcome to Risk weather!</p>
                        <p className={`text-6 font-light`}>
                            Risk weather measures the risks of various digital assets and show them like a 
                            weather forecast. To intuitively understand the risks of my assets, let's learn about 
                            Risk weather's representation.
                        </p>
                    </div>
                    <div className={`hidden lg:block absolute right-20 -bottom-6`}>
                        <Image width="260px" height="370px" src={`/img/coin_character2.png`}></Image>
                    </div>
                </div>
            </div>

            {/* Weather info */}
            <div className={`wrap2 mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
                <div className={`title text-center mb-4`}>
                    <h2 className={`text-4 font-medium`}>WEATHER INFO</h2>
                </div>
                <div className={`table w-full`}>
                    <ul className={`grid grid-cols-3 2xl:grid-cols-9 xl:grid-cols-8 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-5 xs:grid-cols-4`}>
                        <li className={`border-g-green-1`}>
                            <div><Image width="60px" height="60px" src="/img/drought.svg"></Image></div>
                            <h2 className={`text-6`}>Drought</h2>
                            <p className={`text-7 text-center p-1.5`}>Too low volatility to make money</p>
                        </li>
                        <li className={`border-g-green-2`}>
                            <div><Image width="60px" height="60px" src="/img/dry.svg"></Image></div>
                            <h2 className={`text-6`}>Dry</h2>
                            <p className={`text-7 text-center p-1.5`}>Low volatility to make money</p>
                        </li>
                        <li className={`border-g-green-3`}>
                            <div><Image width="60px" height="60px" src="/img/sunny.svg"></Image></div>
                            <h2 className={`text-6`}>Sunny</h2>
                            <p className={`text-7 text-center p-1.5`}>Low risk</p>
                        </li>
                        <li className={`border-g-green-4`}>
                            <div><Image width="60px" height="60px" src="/img/partly_cloud.svg"></Image></div>
                            <h2 className={`text-6`}>Partly cloudy</h2>
                            <p className={`text-7 text-center p-1.5`}>Moderately low risk</p>
                        </li>
                        <li className={`border-g-green-3`}>
                            <div><Image width="60px" height="60px" src="/img/mostly_cloud.svg"></Image></div>
                            <h2 className={`text-6`}>Mostly cloudy</h2>
                            <p className={`text-7 text-center p-1.5`}>Normal risk</p>
                        </li>
                        <li className={`border-g-green-2`}>
                            <div><Image width="60px" height="60px" src="/img/smoke.svg"></Image></div>
                            <h2 className={`text-6`}>Smoke</h2>
                            <p className={`text-7 text-center p-1.5`}>Moderately high risk</p>
                        </li>
                        <li className={`border-g-green-1`}>
                            <div><Image width="60px" height="60px" src="/img/windy.svg"></Image></div>
                            <h2 className={`text-6`}>Windy</h2>
                            <p className={`text-7 text-center p-1.5`}>Risk suddenly rising</p>
                        </li>
                        <li className={`border-g-red-1`}>
                            <div><Image width="60px" height="60px" src="/img/humid.svg"></Image></div>
                            <h2 className={`text-6`}>Humid</h2>
                            <p className={`text-7 text-center p-1.5`}>High risk, but falling</p>
                        </li>
                        <li className={`border-g-red-2`}>
                            <div><Image width="60px" height="60px" src="/img/shower.svg"></Image></div>
                            <h2 className={`text-6`}>Shower</h2>
                            <p className={`text-7 text-center p-1.5`}>Low risk, but slightly rising</p>
                        </li>
                        <li className={`border-g-red-3`}>
                            <div><Image width="60px" height="60px" src="/img/rainy.svg"></Image></div>
                            <h2 className={`text-6`}>Rainy</h2>
                            <p className={`text-7 text-center p-1.5`}>High risk</p>
                        </li>
                        <li className={`border-g-red-4`}>
                            <div><Image width="60px" height="60px" src="/img/heavy_rain.svg"></Image></div>
                            <h2 className={`text-6`}>Heavy rain</h2>
                            <p className={`text-7 text-center p-1.5`}>Even higher risk</p>
                        </li>
                        <li className={`border-g-red-5`}>
                            <div><Image width="60px" height="60px" src="/img/thunderstorm.svg"></Image></div>
                            <h2 className={`text-6`}>Thunder storm</h2>
                            <p className={`text-7 text-center p-1.5`}>Risk sharply rising</p>
                        </li>
                        <li className={`border-g-red-6`}>
                            <div><Image width="60px" height="60px" src="/img/freezy.svg"></Image></div>
                            <h2 className={`text-6`}>Freezy</h2>
                            <p className={`text-7 text-center p-1.5`}>Very high risk, but falling</p>
                        </li>
                        <li className={`border-g-red-7`}>
                            <div><Image width="60px" height="60px" src="/img/snowy.svg"></Image></div>
                            <h2 className={`text-6`}>Snow</h2>
                            <p className={`text-7 text-center p-1.5`}>Very high risk</p>
                        </li>
                        <li className={`border-g-red-8`}>
                            <div><Image width="60px" height="60px" src="/img/heavy_snow.svg"></Image></div>
                            <h2 className={`text-6`}>Heavy snow</h2>
                            <p className={`text-7 text-center p-1.5`}>Extremely high risk</p>
                        </li>
                        <li className={`border-g-red-9`}>
                            <div><Image width="60px" height="60px" src="/img/snowstorm.svg"></Image></div>
                            <h2 className={`text-6`}>Snow storm</h2>
                            <p className={`text-7 text-center p-1.5`}>Extreme risk and sharply rising</p>
                        </li>
                        <li className={`border-g-red-10`}>
                            <div><Image width="60px" height="60px" src="/img/volcano.svg"></Image></div>
                            <h2 className={`text-6`}>Volcano</h2>
                            <p className={`text-7 text-center p-1.5`}>Risk of Explosion</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Risk Model Info */}
            <div className={`wrap2 mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
                <div className={`title text-center mb-4`}>
                    <h2 className={`text-4 font-medium`}>FINANCIAL RISK MODEL</h2> 
                </div>

                <ul className={`grid grid-cols-1 xl:grid-cols-3 gap-5 mb-16`}>
                    <li className={`container-light-gray`}>
                        <div className={`flex-center m-3 h-48`}>
                            <Image width="300px" height="180px" src={`/img/tailrisk_1.png`}></Image>
                        </div>
                        <h2 className={`text-5 font-medium`}>Tail Risk</h2>
                        <p className={`text-6 font-light`}>
                        Tail risk, sometimes called "fat tail risk," is the financial risk of an asset or portfolio of assets moving more than 
                        three standard deviations from its current price, above the risk of a normal distribution. 
                        Tail risks include low-probability events arising at both ends of a normal distribution curve, also known as tail events. However, as investors are generally more concerned with unexpected losses rather than gains, 
                        a debate about tail risk is focused on the left tail.
                        </p>
                    </li>
                    <li className={`container-light-gray`}>
                        <div className={`flex-center m-3 h-48`}>
                            <Image width="400px" height="210px" src={`/img/var_1.png`}></Image>
                        </div>
                        <h2 className={`text-5 font-medium`}>VaR(Value-at-Risk, AVaR)</h2>
                        <p className={`text-6 font-light`}>
                        VaR is the highest possible loss over a certain period of time at a given confidence level. 
                        VaR is defined as the minimum level of loss at a given, sufficiently high confidence level for a predefined time horizon. 
                        The recommended confidence levels are 95% and 99%.
                        </p>
                    </li>
                    <li className={`container-light-gray`}>
                        <div className={`flex-center m-3 mt-0 h-48`}>
                            <Image width="300px" height="180px" src={`/img/cvar_1.png`}></Image>
                        </div>
                        <h2 className={`text-5 font-medium`}>CVaR(Conditional Value-at-Risk)</h2>
                        <p className={`text-6 font-light`}>
                            The disadvantage of VaR that it is not informative about the magnitude of the losses larger than 
                            the VaR level is not present in the risk measure known as Conditional Value-at-Risk: (CVaR), 
                            also known as average VaR and expected shortfall (ES). 
                            The CVaR at tail probability α is defined as the average of the VaRs which are larger than 
                            the VaR at tail probability α.
                        </p>
                    </li>
                </ul>

                {useWindowDimensions().width<1280 && <hr className={"my-16  h-px bg-gray-200 border-0 dark:bg-gray-700"}/>}

                <ul className={`mb-16`}>
                    <li className={`grid grid-cols-1 xl:grid-cols-2 gap-5 mb-10`}>
                        <div className={`container h-72 flex-1 flex-center`}>
                            <Image width="500px" height="140px" src={`/img/tailrisk_2.png`}></Image>
                        </div>
                        <div className={`flex-1`}>
                            <h2 className={`text-5 font-medium`}>Tail risk Description</h2>
                            <p className={`text-6 font-light`}>
                                Let (yt)t∈{'{'}1,2,··· {'}'} be a discrete process of (daily) log-returns of given stock or index.
                                ARMA(1,1)-GARCH(1,1) model is defined by an extension of ARMA(1,1)-GARCH(1,1) model as

                                where κ &gt; 0, ξ, ζ ≥ 0, , ξ + ζ &lt; 1, and (t)t=1,2,··· is a sequence of i.i.d random variables 
                                having zero mean and unit variance.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-1 xl:grid-cols-2 gap-5 mb-10`}>
                        <div className={`container h-72 flex-1 flex-center order-1 xl:order-2`}>
                            <Image width="500px" height="240px" src={`/img/var_2.png`}></Image>
                        </div>
                        <div className={`flex-1 mr-10 order-2 xl:order-1`}>
                            <h2 className={`text-5 font-medium`}>VaR for Normal-ARMA-GARCH model</h2>
                            <p className={`text-6 font-light`}>
                                The definition of VaR with the significance level η is
                                VaRη(X) = − inf {'{'} x ∈ R|P(X ≤ x) &gt; η {'}'}.
                                Considering the ARMA-GARCH model defined, we can define the VaR for the
                                information until time t with significance level η as
                                VaRt,η(yt+1) = − inf{'{'}x ∈ R|Pt(yt+1 ≤ x) &gt; η{'}'},
                                where Pt(A) is the conditional probability of a given event A for the information
                                until time t.
                            </p>
                        </div>
                    </li>
                    <li className={`grid grid-cols-1 xl:grid-cols-2 gap-5 mb-10`}>
                        <div className={`container h-72 flex-1 flex-center`}>
                            <Image width="500px" height="240px" src={`/img/cvar_2.png`}></Image>
                        </div>
                        <div className={`flex-1`}>
                            <h2 className={`text-5 font-medium`}>CVaR(AVaR) for NTS-ARMA-GARCH model</h2>
                            <p className={`text-6 font-light`}>
                                We report the SPX daily returns and daily values of (-AVaRt,0.01(yt+1)) for the normal-ARMA-GARCH and CTS-ARMA-GARCH models.
                                In particular, AVaR seems to be more conservative under stressed scenarios. 
                                This means that AVaR can be considered a good indicator during highly volatile markets.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <Footer></Footer>
        </div>
    )
}

export default Learn;
