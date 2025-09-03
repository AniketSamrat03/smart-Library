import React from 'react'

function ImageCard({id,image}){
    return (
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='justify-center'>
            <img src={image} className='rounded-xl'/>

            </div>
            
        </div>
    )
}



export default ImageCard