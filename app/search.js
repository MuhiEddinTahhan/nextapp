'use client'
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

const SearchBar = () => {
  const [findItem, setFindItem] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (findItem.trim() === "") {
        setResults([]);
        return;
      }
      
      try {
        const q = query(
          collection(db, "items"),
          where("name", ">=", findItem),
          where("name", "<=", findItem + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const res = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(res);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    search();
  }, [findItem]);

  return (
    <div className="w-full max-w-xl flex flex-col mx-auto p-20 text-xl">
      <div className="flex w-full">
        <input
          type="text"
          className="w-full text-black placeholder-gray-500 bg-white p-4 rounded-lg"
          placeholder="Search"
          onChange={e => setFindItem(e.target.value)}
          value={findItem}
        />
        <button className="hover:bg-slate-700 p-4 rounded-lg">🔍</button>
      </div>
      <ul className="mt-4 text-black">
        {results.length === 0 && findItem && <li>No results found</li>}
        {results.map(result => (
          <li key={result.id}>
            <strong>{result.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;