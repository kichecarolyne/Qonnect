import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

function UserInfo() {
    const { data: session } = useSession();
    const [bio, setBio] = useState(session?.user.bio || ''); // Initialize bio with the user's existing bio or an empty string
    const [initialBio, setInitialBio] = useState(session?.user.bio || ''); // Store the initial bio value
    const [editingBio, setEditingBio] = useState(false); // State to control the editing mode

    const handleBioChange = (e) => {
        setBio(e.target.value); // Update bio state as the user types
    };

    const handleSaveBio = () => {
        // Here you can implement logic to save the bio to the backend or perform any other action
        console.log('Saving bio:', bio);
        // For example, you can send an API request to update the user's bio
        setInitialBio(bio); // Update the initial bio value
        setEditingBio(false); // Exit the editing mode
    };

    const handleCancelEdit = () => {
        setBio(initialBio); // Reset the bio to the initial value
        setEditingBio(false); // Exit the editing mode
    };

    return (
        <div className='mt-12'>
            {session && (
                <div className='flex flex-col items-center border-b-[2px] pb-5'>
                    <Image src={session.user?.image} width={75} height={75} alt="user_image" className='rounded-full' />
                    <h2 className='text-[30px] font-bold text-blue-500'>{session.user.name}</h2>
                    {editingBio ? (
                        <div>
                            <textarea
                                value={bio}
                                onChange={handleBioChange}
                                placeholder="Enter your bio..."
                                className="mt-3 border border-gray-300 rounded-lg p-2 resize-none w-full h-24"
                            />
                            <div className="flex justify-end mt-2">
                                <button onClick={handleCancelEdit} className="mr-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">Cancel</button>
                                <button onClick={handleSaveBio} className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Save</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="mt-3 text-gray-500">{bio}</p>
                            <button onClick={() => setEditingBio(true)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit Bio</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserInfo;
