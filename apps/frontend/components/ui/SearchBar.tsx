import { useState } from 'react';
import { InputBase } from "@mui/material";
import { Search } from "lucide-react";
import { motion } from 'framer-motion';


const SearchBar = ({ placeholder, setSearch }: { placeholder: string, setSearch: (search: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSearch(value);
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center bg-white p-2 rounded-full shadow-md mt-3 mx-4"
      >
        <Search className="text-gray-500 ml-2" size={16} />
        <InputBase
          placeholder={placeholder}
          className="ml-3 flex-1 text-gray-700"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </motion.div>
    </div>
  );
};

export default SearchBar;
