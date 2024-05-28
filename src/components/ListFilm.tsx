import React from 'react'

type Props = {}

const ListFilm = (props: Props) => {
  return (
    <div className='mt-3'>
        <div className='flex items-center justify-between'>
        <p className='font-bold text-[20px] border-l-8 border-[#fa320a] pl-2'>NEW & UPCOMING MOVIES IN THEATERS</p>
        <p className='font-bold text-[#3976dc] '>VIEW ALL</p>
        </div>
    </div>
  )
}

export default ListFilm