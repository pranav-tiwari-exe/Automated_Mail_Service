import { useAppContext } from "../context/AppContext";

const ProfileView = () => {
    const { email, name, picture } = useAppContext()

    return (
        <div className="flex w-full max-w-sm items-center gap-4 rounded-lg  ">
            {picture &&(<img style={{ borderColor: "var(--shade1)" }} className="h-10 w-10 rounded-full border-2 object-cover"
                src={picture}
            />)}
            {name && email &&
            (<div>
                <h1 className="truncate text-sm font-semibold">
                    {name}
                </h1>
                <h2 className="truncate text-sm">
                    {email}
                </h2>
            </div>)}
        </div>
    )
}

export default ProfileView;