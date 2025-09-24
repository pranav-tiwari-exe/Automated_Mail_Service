import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";

import CSVIntake from "./CsvIntake";
import MailForm from "./MailForm";
import AttachmentIntake from "./AttachmentsIntake";

const Engine = () => {
    const { theme, setError, setIsLoading } = useAppContext();
    const baseBackendUrl= import.meta.env.VITE_BACKEND_URL;

    //Deal with forms
    const [fileData, setFileData] = useState(null);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);

    const submitForm = async(e) => {
        setIsLoading(true);
        e.preventDefault();

        if(fileData === null) {
            setError("Provide a file containing recepient mails !");
            return;
        }
        if(subject === "") {
            setError("Provide a Subject !");
            return;
        }
        if(body === "") {
            setError("Provide the contents of a the mail !");
            return;
        }

        const formdata= new FormData()
        formdata.append('recipient_list',fileData)
        formdata.append('subject',subject)
        formdata.append('body', body)
        if(attachments.length > 0){
            attachments.forEach (file =>{
                formdata.append('attachments' ,file)
            })
        }

        await axios.post(`${baseBackendUrl}/api/initiate`,formdata, {withCredentials: true,})
        .then(res =>{
            console.log(res.data)
        }).catch( error => {
            setError(error.message)
        })

        setIsLoading(false);
    }

    //For frontend 
    const [activeStep, setActiveStep] = useState(0);

    const arrowIcon = theme === 'light' ? assets.arrowLight : assets.arrowDark
    const sendIcon = theme === 'light' ? assets.sendLight : assets.sendDark

    const baseCss = "rounded-xl px-6 py-6 transition-all ease-in-out scale-95 duration-700 ";
    const openCss = "flex-grow-[4] mx-4 sm:mx-0 h-full sm:scale-100 w-full sm:w-auto z-10 ";
    const closeCss = " w-full sm:max-w-24  sm:h-full ";

    const nextStep = (e, step) => {
        e.stopPropagation();
        setActiveStep(step);
    }


    return (
        <form onSubmit={submitForm} className="h-[80vh] flex flex-col sm:flex-row justify-around items-center gap-2">

            <div onClick={() => setActiveStep(0)} style={{ background: "var(--secondary)" }} className={`${baseCss} ${(activeStep == 0) ? openCss : closeCss}`}>
                <div className={`${activeStep !== 0 && 'overflow-hidden max-h-0'} flex flex-col h-full`}>
                    <h2 className={`text-2xl font-bold mb-4 transition-opacity duration-300 ${activeStep === 0 ? 'opacity-100' : 'opacity-0'}`}>Step 1: Upload File 📄⬆️</h2>
                    <p className={`mb-2 break-words transition-opacity duration-300 ${activeStep === 0 ? 'opacity-100 delay-150' : 'opacity-0'}`}>Simply upload a CSV or XLSX file, and our application will automatically find and extract all email addresses for you. 📧</p>

                    <CSVIntake fileData={fileData} setFileData={setFileData} />

                    <button type="button" onClick={(e) => nextStep(e, 1)} className="rounded-full mt-auto self-end">
                        <img className="h-10 w-10" src={arrowIcon} alt="next"></img>
                    </button>
                </div>
                <div className={`${activeStep === 0 && 'overflow-hidden max-h-0'} flex justify-center items-center h-full`}>
                    <span className="text-5xl font-bold">1</span>
                </div>
            </div>

            <div onClick={() => setActiveStep(1)} style={{ background: "var(--secondary)" }} className={`${baseCss} ${(activeStep == 1) ? openCss : closeCss}`}>
                <div className={`${activeStep !== 1 && 'overflow-hidden max-h-0'} flex flex-col h-full`}>
                    <h2 className={`text-2xl font-bold mb-4 transition-opacity duration-300 ${activeStep === 1 ? 'opacity-100' : 'opacity-0'}`}>Step 2: Compose Your Email ✍️</h2>
                    <p className={`mb-2 break-words transition-opacity duration-300 ${activeStep === 1 ? 'opacity-100 delay-150' : 'opacity-0'}`}>Now it's time to write your message. Fill in the Subject line to give your email a clear title, and then add your message to the Body. You can also attach any files you need to send.</p>


                    <MailForm subject={subject} body={body} setSubject={setSubject} setBody={setBody} />

                    <div className="mb-0 flex justify-between w-full">
                        <button type="button" onClick={(e) => nextStep(e, 0)} className="rounded-full mt-auto ">
                            <img className="h-10 w-10 transform rotate-180" src={arrowIcon} alt="previous"></img>
                        </button>
                        <button type="button" onClick={(e) => nextStep(e, 2)} className="rounded-full mt-auto ">
                            <img className="h-10 w-10" src={arrowIcon} alt="next"></img>
                        </button>
                    </div>
                </div>
                <div className={`${activeStep === 1 && 'overflow-hidden max-h-0'} flex justify-center items-center h-full`}>
                    <span className="text-5xl font-bold">2</span>
                </div>
            </div>

            <div onClick={() => setActiveStep(2)} style={{ background: "var(--secondary)" }} className={`${baseCss} ${(activeStep == 2) ? openCss : closeCss}`}>
                <div className={`${activeStep !== 2 && 'overflow-hidden max-h-0'} flex flex-col h-full`}>
                    <h2 className={`text-2xl font-bold mb-4 transition-opacity duration-300 ${activeStep === 2 ? 'opacity-100' : 'opacity-0'}`}>Step 3: Add Attachments 📎</h2>
                    <p className={`mb-2 break-words transition-opacity duration-300 ${activeStep === 2 ? 'opacity-100 delay-150' : 'opacity-0'}`}>This is where you can manage the files you'll be sending. Add the documents you need and remove any you don't. You're just one step away from sending your emails!</p>

                    <AttachmentIntake attachments={attachments} setAttachments={setAttachments} />

                    <div className="mb-0 flex justify-between w-full">
                        <button type="button" onClick={(e) => nextStep(e, 1)} className="rounded-full mt-auto ">
                            <img className="h-10 w-10 transform rotate-180" src={arrowIcon} alt="previous"></img>
                        </button>
                        <button type="submit" className="rounded-full transition-all duration-300 hover:scale-105 active:scale-90">
                            <img className="h-10 w-10" src={sendIcon} alt="Send" />
                        </button>
                    </div>
                </div>
                <div className={`${activeStep === 2 && 'overflow-hidden max-h-0'} flex justify-center items-center h-full`}>
                    <span className="text-5xl font-bold">3</span>
                </div>
            </div>

        </form>
    )
}
export default Engine;