import { useState } from "react";

const Engine= ()=>{

    const [activeStep, setActiveStep] = useState(0);


    const baseCss = "rounded-xl px-6 py-6 transition-all scale-95 duration-500 shadow-md shadow-white/10";
    const openCss = "flex-grow-[4] mx-4 sm:mx-0 h-full sm:scale-100 w-full sm:w-auto z-10 ";    
    const closeCss = " w-full sm:w-24 sm:h-full";    

    return(
        <div className="h-[80vh] flex flex-col sm:flex-row justify-around items-center gap-2">
            <div onClick={() => setActiveStep(0)} style={{ background :"var(--secondary)"}} className={`${baseCss} ${(activeStep==0)? openCss:closeCss}`}>
                {activeStep==0 ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Step 1: Configure Settings</h2>
                        <p className="mb-2">Set up your preferences and configurations for the mailing service.</p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <span className="text-5xl font-bold">1</span>
                    </div>
                )}
            </div>

            <div onClick={() => setActiveStep(1)} style={{ background :"var(--secondary)"}} className={`${baseCss} ${(activeStep==1)? openCss:closeCss}`}>
                {activeStep==1 ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Step 2: Configure Settings</h2>
                        <p className="mb-2">Set up your preferences and configurations for the mailing service.</p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <span className="text-5xl font-bold">2</span>
                    </div>
                )}
            </div>

            <div onClick={() => setActiveStep(2)} style={{ background :"var(--secondary)"}} className={`${baseCss} ${(activeStep==2)? openCss:closeCss}`}>
                {activeStep==2 ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Step 3: Configure Settings</h2>
                        <p className="mb-2">Set up your preferences and configurations for the mailing service.</p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full ">
                        <span className="text-5xl font-bold">3</span>
                    </div>
                )}
            </div>
            
            
        </div>
    )
}
export default Engine;