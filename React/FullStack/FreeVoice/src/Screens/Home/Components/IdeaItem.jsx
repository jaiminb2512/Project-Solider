import React from 'react';
import { db } from './../../../../utils/index';
import { Ideas } from '../../../../utils/schema';
import { eq } from 'drizzle-orm';

function IdeaItem({ idea, index, refreshData }) {
  // console.log(idea);

  const upVoteHandler = async () => {
    const result = await db.update(Ideas)
      .set({
        vote: idea.vote + 1
      })
      .where(eq(Ideas.id, idea.id))
      .returning({ id: Ideas.id });

    if (result) {
      refreshData();
    }
  };

  const downVoteHandler = async () => {
    const result = await db.update(Ideas)
      .set({
        vote: idea.vote - 1
      })
      .where(eq(Ideas.id, idea.id))
      .returning({ id: Ideas.id });

    if (result) {
      refreshData();
    }
  };

  return (
    <div className='my-5 pb-5 border shadow-lg rounded-lg'>
      <div className='p-5 flex gap-7'>
        <h2 className='flex gap-2'><span>{index + 1}. </span>{idea?.content}</h2>
        <div className='flex flex-col items-center '>
          <h2 className='text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2' onClick={upVoteHandler}>🔥</h2>
          <h2 className='text-lg rounded-md p-1 font-bold'>{idea.vote}</h2>
          <h2 className='text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2' onClick={downVoteHandler}>👎</h2>
        </div>
      </div>
      <h2 className='pl-5 text-gray-400 text-lg'>By @{idea.username}</h2>
    </div>
  );
}

export default IdeaItem;
