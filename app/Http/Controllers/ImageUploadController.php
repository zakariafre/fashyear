<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Handle multiple image upload request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        // Validate the uploaded files
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max per image
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('images')) {
                $uploadedUrls = [];
                
                foreach ($request->file('images') as $file) {
                    // Determine the target directory based on type parameter
                    $type = $request->input('type', 'products'); // Default to products if not specified
                    $directory = in_array($type, ['categories', 'products']) ? $type : 'products';
                    
                    // Generate a unique filename
                    $filename = $directory . '_' . Str::uuid() . '.' . $file->getClientOriginalExtension();
                    
                    // Store the file in the public disk under the appropriate directory
                    $path = $file->storeAs($directory, $filename, 'public');
                    
                    // Store the full URL
                    $uploadedUrls[] = asset('storage/' . $path);
                }
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Images uploaded successfully',
                    'data' => [
                        'imageUrls' => $uploadedUrls
                    ]
                ]);
            }
            
            return response()->json([
                'status' => 'error',
                'message' => 'No images provided'
            ], 400);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload images: ' . $e->getMessage()
            ], 500);
        }
    }
} 