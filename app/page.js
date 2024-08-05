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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-gray-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center text-gray-800'>Pantry App</h1>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <form className='grid grid-cols-6 gap-4 items-center text-gray-800'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-2 p-3 rounded-lg border border-gray-300"
              type="text"
              placeholder="Enter item"
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="col-span-2 p-3 rounded-lg border border-gray-300"
              type="number"
              placeholder="Enter $"
            />
            <button
              onClick={addItems}
              className='col-span-2 text-white bg-blue-600 hover:bg-blue-500 p-3 text-xl rounded-lg'
              type="submit">Add Item</button>
          </form>
          <ul className='mt-6'>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between'>
                <div className='p-4 w-full flex justify-between bg-gray-200 rounded-lg text-black'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  className='text-white bg-red-600 hover:bg-red-500 p-4 rounded-lg mx-3'
                  onClick={() => deleteItem(item.id)}>
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div className='p-3 flex justify-between bg-gray-100 rounded-lg mt-4 text-black'>
              <span className='capitalize font-semibold'>Total</span>
              <span className='font-semibold'>${total}</span>
            </div>
          )}
        </div>
        <div className="mt-8 w-full">
          <SearchBar />
        </div>
      </div>
    </main>
  );
}
