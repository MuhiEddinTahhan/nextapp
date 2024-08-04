// 'use client'
// import React, { useState, useEffect } from "react";
// import { getFirestore, collection, getDocs, QuerySnapshot, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
// import { addDoc } from "firebase/firestore";
// import {db} from './firebase';

// const SearchBar = () => {
//     const [findItem, setFindItem] = useState('')

//     useEffect(() => {
//         async function search(e){
//             //e.preventDefault()
//             //setFindItem(e.target.value)
            
//             const q = query(collection(db, "items", where("name", ">=", findItem), where("name", "<=", findItem + "A\\uf8ff")))
//             const doc_refs =  getDocs(q)
//             //console.log(q)
//             const res = []
        
//             doc_refs.forEach(setFindItem => {
//               res.push({id: doc.id, ...doc.data()})
//             })
//             setResults(res)
//           }
        
//     })

// return(
//     <div className= "w-full max-w-xl flex mx-auto p-20 text-xl">
//       <input
//       type ="text"
//       className = "w-full text-black placeholder: bg-white p-4"
//       placeholder="Search"
//       onChange={e => setFindItem(e.target.value)}
//       value={findItem}>
//       </input>
//       <button className="bg-slate-900 hover:bg-slate-700 p-4">🔍</button>
//     </div>
// )
// }
// export default SearchBar;

// components/SearchBar.js
// import { useState } from "react";
// import {db} from './firebase';
// import { collection, query, where, getDocs } from "firebase/firestore";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     if (searchTerm.trim() === "") {
//       setResults([]);
//       return;
//     }

//     try {
//       const q = query(collection(db, "items"), where("fieldName", "==", searchTerm));
//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         console.log("No matching documents.");
//         setResults([]);
//         return;
//       }

//       const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log("Search Results:", data); // Debugging line
//       setResults(data);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   };

//   return (
//     <div>
//       <input className="text-black"
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search..."
//       />
//       <button onClick={handleSearch}>Search</button>
//       <ul>
//         {results.length === 0 && searchTerm && <li>No results found</li>}
//         {results.map((result) => (
//           <li key={result.id}>
//             {/* Adjust fieldName and add other fields as needed */}
//             <strong>{result.fieldName}</strong>
//             {/* Display additional fields here */}
//             <p>{result.otherField}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SearchBar;


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
          className="w-full text-black placeholder-gray-500 bg-white p-4"
          placeholder="Search"
          onChange={e => setFindItem(e.target.value)}
          value={findItem}
        />
        <button className="bg-slate-900 hover:bg-slate-700 p-4">🔍</button>
      </div>
      <ul className="mt-4">
        {results.length === 0 && findItem && <li>No results found</li>}
        {results.map(result => (
          <li key={result.id}>
            <strong>{result.name}</strong>
            {/* Display additional fields here if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;