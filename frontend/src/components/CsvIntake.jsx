import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const CSVIntake = (props) => {

    const { theme } = useAppContext();
    const uploadIcon = (theme === 'light') ? assets.documentLight : assets.documentDark;
    const reuploadIcon = (theme === 'light') ? assets.exchangeLight : assets.exchangeDark;
    const hoverColor = (theme === 'light') ? 'hover:bg-black/20' : 'hover:bg-white/20';

    return (
        <>
            <label htmlFor="emailfileInput" className={`cursor-pointer rounded-lg border-2 m-6 sm:m-12 h-full border-dashed border-gray-300 p-6 flex flex-col hover:scale-105 transition duration-700 items-center justify-center ${hoverColor} transition-colors`}>
                <input
                    id="emailfileInput"
                    onChange={e => props.setFileData(e.target.files[0])}
                    type="file"
                    accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="hidden"
                />

                {props.fileData === null ? (
                    <div className="mt-4 p-4  flex flex-col items-center justify-center">
                        <img src={uploadIcon} alt="Upload Icon" className="w-12 h-12 mb-4" />
                        <span className="text-sm">Click to upload a CSV or Excel file</span>
                    </div>
                ) : (
                    <div className="mt-4 p-4  flex flex-col items-center justify-center">
                        <img src={reuploadIcon} alt="Upload Icon" className="w-12 h-12 mb-4" />
                        <span className="text-sm mb-2">Click to Re-upload a CSV or Excel file</span>
                        <p className="text-sm mb-2 w-[200px] truncate">File Selected: {props.fileData.name} </p>
                        <p className="text-sm mb-2">Size: {(props.fileData.size < 1024*1024)? (props.fileData.size / 1024).toFixed(2) + 'KB':(props.fileData.size / 1024*1024).toFixed(2) + 'MB'}</p>
                    </div> 
                )}
            </label>
        </>
    );
}
export default CSVIntake;