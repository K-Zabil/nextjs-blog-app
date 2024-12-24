"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category } from '@/entities/post';

interface FilterContextType {
    category: Category | string;
    setCategory: (category: Category | string) => void;
    minPrice: number;
    setMinPrice: (price: number) => void;
    maxPrice: number;
    setMaxPrice: (price: number) => void;
    sortByDate: boolean;
    toggleSortByDate: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [category, setCategory] = useState<Category | string>('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [sortByDate, setSortByDate] = useState(false);

    const toggleSortByDate = () => setSortByDate((prev) => !prev);

    return (
        <FilterContext.Provider value={{ category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, sortByDate, toggleSortByDate }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};