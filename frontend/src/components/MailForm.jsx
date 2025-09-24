import TipTapEditor from './TipTapEditor';

const MailForm = (props) => {
    return (
        <div className="h-full flex flex-col justify-around gap-4 mb-3">
            <div className='w-full flex flex-wrap justify-left mt-6'>
                <label htmlFor='subjectInput'>Subject:</label>
                <input id="subjectInput" className="flex-grow-[1] ml-10 mr-10 bg-transparent border-2 border-gray-500/50 pl-6 pr-2 rounded-lg overflow-y-none" type='text' placeholder='...'
                value={props.subject} 
                onChange={e => {props.setSubject(e.target.value)}}
                ></input>
            </div>
            <TipTapEditor initialContent={props.body}  onChange={props.setBody}/>
        </div>
    )
}

export default MailForm;