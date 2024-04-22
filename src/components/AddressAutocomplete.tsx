import React, { useState } from "react";
import axios from "axios";
import "../css/address.css";

interface AddressAutocompleteProps {
  onSelect: (address: string) => void;
  placeholder: string;
  width?: string;
  height?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onSelect,
  placeholder,
  width = "60%", // Default width
  height = "20%", // Default height
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Fetch autocomplete suggestions from Nominatim
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    setInputValue(suggestion.display_name);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
    if (onSelect) {
      onSelect(suggestion.display_name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
    }
  };

  return (
    <div className="addressauto_contain">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{ width: "70%", boxSizing: "border-box" }}
        className="autoinput"
      />

      <ul style={{ width, height }}>
        {suggestions.map((suggestion: any, index: number) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSelectSuggestion(suggestion)}
            className={index === selectedSuggestionIndex ? "selected" : ""}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
