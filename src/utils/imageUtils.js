import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Function to save an image file to the assets directory
export const saveProductImage = async (file) => {
    try {
        const fileName = `product_${uuidv4()}.${file.name.split('.').pop()}`;
        const savePath = path.join(process.cwd(), 'src', 'assets', 'products', fileName);
        
        // Create a readable stream from the file
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        
        return new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    // Write the file
                    await fs.promises.writeFile(savePath, Buffer.from(reader.result));
                    
                    // Return the relative path for importing
                    const relativePath = `../../assets/products/${fileName}`;
                    resolve(relativePath);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
        });
    } catch (error) {
        console.error('Error saving image:', error);
        throw error;
    }
};

// Function to delete a product image
export const deleteProductImage = async (imagePath) => {
    try {
        const fullPath = path.join(process.cwd(), 'src', imagePath.replace('../../', ''));
        await fs.promises.unlink(fullPath);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

// Function to import an image dynamically
export const importProductImage = async (imagePath) => {
    try {
        return await import(imagePath);
    } catch (error) {
        console.error('Error importing image:', error);
        throw error;
    }
}; 