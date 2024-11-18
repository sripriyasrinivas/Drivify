// api.js
export const saveApplication = async (formData) => {
    try {
        const response = await fetch("http://localhost:5000/api/save-application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json(); // Return the JSON response
    } catch (error) {
        console.error('Error saving application:', error);
        throw error; // Rethrow error for handling in the caller
    }
};

export const getApplication = async (applicationId) => {
    try {
        const response = await fetch("http://localhost:5000/api/get-application?applicationId="+applicationId, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json(); // Return the JSON response
    } catch (error) {
        console.error('Error getting application:', error);
        throw error; // Rethrow error for handling in the caller
    }
};
