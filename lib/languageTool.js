export const checkGrammar = async (text) => {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        language: 'en-US', // Adjust based on user preference
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch grammar suggestions.');
    }
  
    const data = await response.json();
    return data.matches; // List of grammar/spelling suggestions
  };
  