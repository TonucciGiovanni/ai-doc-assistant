import { createContext, useContext, useReducer } from 'react';

const DocumentContext = createContext();

const initialState = {
  originalDoc: null,
  improvedDoc: null,
  suggestions: [], // Suggestions grouped by paragraphs
  loading: false,
  error: null,
  finalDoc: null,
  allSuggestionsReviewed: false,
};

//Reducer function for managing document state
const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_DOCUMENT':
      return {
        ...initialState,
        originalDoc: action.payload,
        improvedDoc: action.payload,
      };
    case 'UPLOAD_START':
      return { ...state, loading: true, error: null };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        originalDoc: action.payload.original,
        improvedDoc: action.payload.improved,
        suggestions: action.payload.suggestions,
        finalDoc: null, // Reset finalDoc on new upload
      };
    case 'UPLOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_SUGGESTION':
      return {
        ...state,
        suggestions: state.suggestions.map((suggestion) =>
          suggestion.id === action.payload.id
            ? { ...suggestion, status: action.payload.status }
            : suggestion
        ),
      };
    case 'SET_FINAL_DOCUMENT': 
      return {
        ...state,
        finalDoc: action.payload,
      };
    case 'UPDATE_REVIEW_STATUS':
        return {
          ...state,
          allSuggestionsReviewed: action.payload,
        };
    default:
      return state;
  }
};

export const DocumentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkReviewStatus = () => {
    const allReviewed = state.suggestions.every(
      (suggestion) => suggestion.status !== 'pending'
    );
    dispatch({ type: 'UPDATE_REVIEW_STATUS', payload: allReviewed });
  };

  const mergeDocument = () => {
    let content = state.originalDoc;

    // Sort suggestions by start index descending to prevent replacement issues
    const sortedSuggestions = [...state.suggestions]
      .filter((s) => s.status === 'accepted')
      .sort((a, b) => b.start - a.start);

    // Apply accepted changes
    sortedSuggestions.forEach((suggestion) => {
      const before = content.slice(0, suggestion.start);
      const after = content.slice(suggestion.end);
      content = before + suggestion.text + after;
    });

    dispatch({ type: 'SET_FINAL_DOCUMENT', payload: content });
  };

  return (
    <DocumentContext.Provider
      value={{ state, dispatch, mergeDocument, checkReviewStatus }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => useContext(DocumentContext);