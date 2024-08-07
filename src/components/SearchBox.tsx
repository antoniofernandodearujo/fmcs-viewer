import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        mt={5} 
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          sx={{ 
            width: 700, 
            border: 2, 
            borderRadius:'5px',  
            borderColor: '#ffffff',
            '@media (max-width: 600px)': {
              width: '90%',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <IconButton 
          sx={{ 
            position: 'relative', 
            right: 50,
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }} 
          onClick={handleSearch}
        >
          <SearchIcon sx={{ color: '#a2cfc2' }}/>
        </IconButton>
      </Box>
    </>
  );
};

export default SearchBox;
