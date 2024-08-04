'use client'
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, QuerySnapshot, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
import { addDoc } from "firebase/firestore";
import {db} from './firebase';
import SearchBar from "@/app/search";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState ({name: '', price: ''});
  const [total, setTotal]= useState (0);
  // const [results, setResults] = useState([])


  //add items to database
  const addItems = async (e) => {
    //e.preventDefualt();
    if (newItem.name !== '' && newItem.price !== ''){
      //setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
    }
  };

  //read items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      
      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArr);

      //read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  //delete items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  //search bar

  // const [findItem, setFindItem] = useState('')

  // async function search(e){
  //   //e.preventDefault()
  //   setFindItem(e.target.value)
    
  //   const q = query(collection(db, "items", where("name", ">=", findItem), where("name", "<=", findItem + "A\\uf8ff")))
  //   const doc_refs =  getDocs(q)

  //   const res = []

  //   doc_refs.forEach((doc) => {
  //     res.push({id: doc.id, ...doc.data()})
  //   })
  //   setItems(res)
  // }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Pantry App</h1>
        <div className= 'bg-slate-800 p-4 rounded-lg'>
          <form className= 'grid grid-cols-6 items-center text-black'>
            <input
            value= {newItem.name}
            onChange= {(e) => setNewItem({...newItem, name: e.target.value})} 
            className="col-span-2 p-3 rounded-lg border" 
            type="text" 
            placeholder="enter item">
            </input>
            
            <input
            value= {newItem.price}
            onChange= {(e) => setNewItem({...newItem, price: e.target.value})} 
            className="col-span-2 p-3 rounded-lg border mx-3" 
            type="number"
            placeholder= "enter $">
            </input>

            <button
            onClick= {addItems} 
            className= 'text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-lg' 
            type="submit">+</button>
          
          </form>
          <ul>
          {items.map((item, id) => (                    
            <li key= {id} className= 'my-4 w-full flex justify-between'>
            <div className= 'p-4 w-full flex justify-between bg-slate-950 rounded-lg '>
              <span className= 'capitalize'>{item.name}</span>
              <span>${item.price}</span>
            </div>
            <button 
            className= 'text-white bg-slate-950 hover:bg-slate-900 p-4 rounded-lg mx-3'
            onClick= {() => deleteItem(item.id)}>
              X
              </button>
            </li>
              ))}
          </ul>
          {items.length < 0 ? ('') : (
            <div className= 'p-3 flex justify-between'>
              <span className= 'capitalize'>total</span>
              <span className= ''>${total}</span>
            </div>
          )}
        </div>
        {/* <div className= " rid grid-cols-6 w-full max-w-xl flex mx-auto p-20 text-xl">
          <input
          type ="text"
          className = "w-full text-black placeholder: bg-white p-4"
          placeholder="Search"
          onChange={e => setFindItem(e.target.value)}
          value={findItem}>
          </input>
          <button className="bg-slate-900 hover:bg-slate-700 p-4">🔍</button>
          <div>
          <ul>
          {items.map((item, id) => (                    
            <li key= {id} className= 'my-4 w-full flex justify-between'>
            <div className= 'p-4 w-full flex justify-between bg-slate-950 rounded-lg '>
              <span className= 'capitalize'>{item.name}</span>
              <span>${item.price}</span>
            </div>
            <button 
            className= 'text-white bg-slate-950 hover:bg-slate-900 p-4 rounded-lg mx-3'
            onClick= {() => deleteItem(item.id)}>
              X
              </button>
            </li>
              ))}
          </ul>
          {items.length < 0 ? ('') : (
            <div className= 'p-3 flex justify-between'>
              <span className= 'capitalize'>total</span>
              <span className= ''>${total}</span>
            </div>
          )}

        </div>
        </div>
        <SearchBar></SearchBar> */}
        <SearchBar></SearchBar>
      </div>
    </main>
  );
}
