import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeSection: string | null;
  navigateToSection: (sectionId: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navigateToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Auto-clear highlight after 3 seconds
      setTimeout(() => {
        setActiveSection(null);
      }, 3000);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, activeSection, navigateToSection }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
