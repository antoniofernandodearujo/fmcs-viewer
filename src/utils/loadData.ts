export const loadData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Data loaded successfully:", data); // Adicione este log
    return data;
  } catch (error) {
    console.error("Error loading data:", error); // Adicione este log
    return [];
  }
};
