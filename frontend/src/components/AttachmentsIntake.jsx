import { useCallback } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const AttachmentIntake = (props) => {

    const { theme } = useAppContext();
    const uploadIcon = (theme === 'light') ? assets.documentLight : assets.documentDark;
    const reuploadIcon = (theme === 'light') ? assets.exchangeLight : assets.exchangeDark;
    const hoverColor = (theme === 'light') ? 'hover:bg-black/20' : 'hover:bg-white/20';

    const attachmentsArray = props.attachments ? Array.from(props.attachments):[];

    const calculateTotalSize = (files) => {
        let total = 0;
        for (let i = 0; i < files.length; i++) {
            total += files[i].size;
        }
        if (total >= 1024 * 1024) {
            return (total / (1024 * 1024)).toFixed(2) + ' MB';
        }
        return (total / 1024).toFixed(2) + ' KB';
    };

    const removeFile = useCallback((removeIndex) => {
        props.setAttachments(attachments => attachments.filter((_,index) => index !== removeIndex)        )
    },[props.setAttachments])

    return (
        <>
            <label htmlFor="attachmentInput" className={`cursor-pointer rounded-lg border-2 m-6 sm:m-12 h-full border-dashed border-gray-500 p-6 flex flex-col hover:scale-105 transition duration-700 items-center justify-center ${hoverColor} transition-colors`}>
                <input
                    id="attachmentInput"
                    onChange={e => props.setAttachments([...attachmentsArray,...e.target.files])}
                    type="file"
                    className="hidden"
                    multiple
                />

                {props.attachments.length === 0 ? (
                    <div className="mt-4 p-4  flex flex-col items-center justify-center">
                        <img src={uploadIcon} alt="Upload Icon" className="w-12 h-12 mb-4" />
                        <span className="text-sm">Click to Attach file</span>
                    </div>
                ) : (
                    <div className="mt-4 p-4 w-full flex flex-col items-center justify-center">
                        <img src={reuploadIcon} alt="Upload Icon" className="w-12 h-12 mb-4" />
                        <span className="text-sm mb-2">Click to Attach more files</span>

                        <div className="text-sm text-gray-700 dark:text-gray-300 h-[60px] scrollable w-full ">
                           <p className="font-medium">{attachmentsArray.length} file(s) selected:</p>
                           <ul className="list-disc list-inside text-left text-xs truncate w-full p-3">
                               {attachmentsArray.map((file, index) => (
                                   <li key={index} className="text-gray-600 dark:text-gray-400 flex justify-between w-full">
                                    <p className="truncate w-200px">{file.name}</p>
                                    <button id={index} type="button" onClick={e => {e.preventDefault();removeFile(index)}}>X</button>
                                   </li>
                               ))}
                           </ul>
                        </div>
                        
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                           Total Size: {calculateTotalSize(attachmentsArray)}
                        </p>
                    </div>
                )}
            </label>
        </>
    );
}
export default AttachmentIntake;