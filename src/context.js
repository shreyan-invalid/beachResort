import React, { Component } from 'react';
// import items from './data';
import client from './Contentful';

const RoomContext= React.createContext();

class RoomProvider extends Component {

    state= {
        rooms:[],
        sortedrooms: [],
        featuredRooms:[],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    getData = async () => {
        try{
            let response= await client.getEntries({
                content_type: "beachResortRoomExample"
            })

            let rooms= this.formatData(response.items);
            let featuredRooms= rooms.filter(room => room.featured === true);
            let maxPrice= Math.max(...rooms.map(room => 
                room.price
            ));

            let maxSize= Math.max(...rooms.map(room => room.size));
            this.setState({

                rooms,
                featuredRooms,
                loading: false,
                sortedrooms: rooms,
                price: maxPrice,
                maxPrice,
                maxSize
            })

        }catch(error){
            console.log(error);
        }
    }
    componentDidMount(){
        this.getData()
    }

    formatData(items){
        let tempItems= items.map(item => {
            let id= item.sys.id;
            let images= item.fields.images.map(image => 
                image.fields.file.url
            );

            let rooms = {...item.fields, images, id};
            return rooms;
        });

        return tempItems;
    }

    getRoom = slug =>{
        let tempRooms= [...this.state.rooms];
        const room= tempRooms.find(room => room.slug=== slug);
        return room;
    }

    handleChange= event =>{
        const target= event.target;
        const value= target.type=== 'checkbox'? target.checked: target.value;
        const name= target.name;

        this.setState(
            {
                [name]: value
            },
            this.filterRooms
            
        );
        
    };

    filterRooms= () => {
        let{rooms, type, capacity, price, minSize, maxSize, breakfast, pets}= this.state;

        let tempRooms= [...rooms];

        capacity= parseInt(capacity);
        price= parseInt(price);


        if(capacity!== 1){
            tempRooms= tempRooms.filter(room => room.capacity>= capacity)
        }

        if(type !== 'all'){
            tempRooms= tempRooms.filter(room=> room.type === type);
        }

        tempRooms= tempRooms.filter(room=> room.price <= price);

        tempRooms= tempRooms.filter(room=> room.size >= minSize && room.size<= maxSize);

        if(breakfast){
            tempRooms= tempRooms.filter(room=> room.breakfast=== true)
        }

        if(pets){
            tempRooms= tempRooms.filter(room=> room.pet=== true);
        }

       this.setState({
           sortedrooms: tempRooms
        }
           );
        
    };
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;


export {RoomProvider, RoomConsumer, RoomContext};


export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return(
            <RoomConsumer>
                {value=> <Component {...props} context={value}/>}
            </RoomConsumer>
        );
    };
};