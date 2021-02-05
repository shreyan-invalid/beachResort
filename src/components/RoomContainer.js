import React from 'react';
import RoomFiltered from './RoomFiltered';
import RoomList from './RoomList';
import {withRoomConsumer} from '../context';
import Loading from './Loading';

function RoomContainer({context}) {
    const{sortedrooms, rooms, loading}= context;
    
    
    if(loading){
        return(
            <Loading/>
        )
    }

    return (
        <>
            <RoomFiltered rooms={rooms}/>
            <RoomList rooms={sortedrooms}/>
        </>
    );
} 

export default withRoomConsumer(RoomContainer);

// export default function RoomContainer() {

    
//     return (
        
        
//         <RoomConsumer>
//             {value => {
                
//                 const {loading, sortedrooms, rooms}= value
                
//                 if(loading){
//                     return(
//                         <Loading/>
//                     )
//                 }
//                 return(
//                     <>
//                         <RoomFiltered rooms={sortedrooms}/>
//                         <RoomList rooms={rooms}/>
//                     </>
//                 )
//             }}
//         </RoomConsumer>
        
//     )
// }
