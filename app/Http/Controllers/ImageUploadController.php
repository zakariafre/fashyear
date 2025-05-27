<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Handle image upload request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        \Log::info('Image upload request received', ['request' => $request->all()]);
        
        // Validate the uploaded file
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            \Log::error('Image validation failed:', $validator->errors()->toArray());
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                
                // Log file information
                \Log::info('Processing uploaded file:', [
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize()
                ]);
                
                // Determine the target directory based on type parameter
                $type = $request->input('type', 'products'); // Default to products if not specified
                $directory = in_array($type, ['categories', 'products']) ? $type : 'products';
                
                // Generate a unique filename
                $filename = $directory . '_' . Str::uuid() . '.' . $file->getClientOriginalExtension();
                
                // Ensure the directory exists
                Storage::disk('public')->makeDirectory($directory);
                
                // Store the file in the public disk under the appropriate directory
                $path = $file->storeAs($directory, $filename, 'public');
                
                if (!$path) {
                    throw new \Exception('Failed to store the file');
                }
                
                // Generate the URL for the stored image
                $url = asset('storage/' . $path);
                
                \Log::info('Image uploaded successfully', [
                    'path' => $path,
                    'url' => $url
                ]);
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Image uploaded successfully',
                    'data' => [
                        'imageUrl' => $url,
                        'filename' => $filename,
                        'path' => $path
                    ]
                ]);
            }
            
            \Log::error('No image file provided in request');
            return response()->json([
                'status' => 'error',
                'message' => 'No image file provided'
            ], 400);
            
        } catch (\Exception $e) {
            \Log::error('Failed to upload image:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }
} 