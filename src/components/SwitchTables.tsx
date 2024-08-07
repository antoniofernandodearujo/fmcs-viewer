import React, { useState } from 'react';
import { Switch, FormControlLabel, CircularProgress } from '@mui/material';

const SwitchTables: React.FC = () => {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = () => {
        if (loading) {
            setLoading(false);
        }

        setChecked((prevChecked) => !prevChecked);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000); // Atraso de 1 segundo
    };

    return (
        <FormControlLabel
            control={
                loading ? (
                    <CircularProgress 
                        size={20} 
                        sx={{ color: '#ffffff' }}

                    />
                ) : (
                    <Switch 
                        checked={checked} 
                        onChange={handleChange} 
                        color="primary" 
                    />
                )
            }
            label={checked ? 'Pivot Table' : 'Data Table'}
        />
    );
};

export default SwitchTables;