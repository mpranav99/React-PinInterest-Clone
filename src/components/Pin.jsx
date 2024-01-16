import React , {useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Pin = ({pin : {postedBy , image , destination , _id, save}}) => {
    const [postHovered , setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();

    const userInfo = fetchUser();
    const alreadySaved = save?.filter((item) => 
        item.postedBy._id === userInfo.sub
    ).length;
    
    const savePin = (id) =>{
        setSavingPost(true);
        client.patch(id)
            .setIfMissing({save: []})
            .insert('after' , 'save[-1]', [{
                _key : uuidv4(),
                userId : userInfo.sub,
                postedBy:{
                    _type: "postedBy",
                    _ref : userInfo.sub
                }
            }])
            .commit()
            .then(()=>{
                window.location.reload();
                setSavingPost(false);
            })
    }

    return (
        <div className='m-2'>
            <div 
                onMouseEnter={()=> setPostHovered(true)}
                onMouseLeave={()=> setPostHovered(false)}
                onClick={()=>navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
                <img className="rounded-lg w-full " src={urlFor(image).width(250).url()} alt="" />
                {postHovered && (
                     <div
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                        style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a href={`${image?.asset?.url}?dl=`} onClick={(e)=> e.stopPropagation}
                                    className='bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                               <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 rounded-3xl text-white px-5 py-1 font-bold text-base hover:shadow-md outline-none'>
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                 onClick={e => {
                                    e.stopPropagation();
                                    savePin(_id);
                                 }}
                                 type='button' className='bg-red-500 opacity-70 hover:opacity-100 rounded-3xl text-white px-5 py-1 font-bold text-base hover:shadow-md outline-none'>
                                    Save
                                </button>
                            )}
                        </div>   
                    </div>
                )}
            </div>
    
        </div>
    );
};

export default Pin;