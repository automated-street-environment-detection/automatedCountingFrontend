import { createSlice } from "@reduxjs/toolkit";

const countsSlice = createSlice({
  name: "counts",
  initialState: {
    counts: {},
    countsList:[],
    timestamps:[]
  },
  reducers: {
    incrementCount: (state, action) => {
      state.counts[action.payload]
        ? (state.counts[action.payload] += 1)
        : (state.counts[action.payload] = 1);
    },
    undoCount: (state, action) => {
      if (state.counts[action.payload]) {
        state.counts[action.payload] -= 1;
      }
    },
    //counts{title,cars,bikes,...,timestamps}
    incrementTimeStamp: (state, action) => {
      const { type, timestamp } = action.payload; 
      const currentCount = state.counts[type] || 0; 
      state.timestamps.push({ type, timestamp, presentCount: currentCount }); 
    },

    // Undo the last timestamp entry
    undoTimeStamp: (state) => {
      state.timestamps.pop(); 
      console.log(state.timestamps);
    },
    //addCounttoCountList(count)
    addCounttoCountList:(state,action)=>{
      state.countsList.push(action.payload);
    },
    //selectCount(count)
    selectCount: (state, action) => {
      state.counts = action.payload;
      if(state.counts.title!=null){
        state.timestamps = state.counts.timestamps;
      }
      else{
        state.timestamps = [];
      }
    },
    //updateCountInList(count)
    updateCountInList: (state, action) => {
      const updatedCount = action.payload;
      const index = state.countsList.findIndex((count) => count.title === updatedCount.title);
      if (index !== -1) {
        state.countsList[index] = updatedCount; 
      }
    },
    //deleteCount(count.title)
    deleteCount: (state, action) => {
      state.countsList = state.countsList.filter(count => count.title !== action.payload);
    }
  },
});

export const { incrementCount, undoCount,incrementTimeStamp,
undoTimeStamp,addCounttoCountList,selectCount,updateCountInList,deleteCount } = countsSlice.actions;
export default countsSlice.reducer;
