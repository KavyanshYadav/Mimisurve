import { RootState } from '@reduxjs/toolkit/query';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../slice/CounterSice';

function Projects() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>dispatch(increment())}>incre</button>
    </div>
  )
}

export default Projects