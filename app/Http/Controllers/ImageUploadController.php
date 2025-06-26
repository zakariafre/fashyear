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
            if (!$request->hasFile('images')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No images provided'
                ], 400);
            }

            // Ensure the storage directory exists
            if (!Storage::disk('public')->exists('products')) {
                Storage::disk('public')->makeDirectory('products');
            }

            $uploadedUrls = [];
            foreach ($request->file('images') as $file) {
                // Generate a unique filename
                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
                
                // Store the file in the public disk under the products directory
                $path = $file->storeAs('products', $filename, 'public');
                
                // Get the full URL for the stored file
                $url = asset('storage/' . $path);
                
                // Store the full URL
                $uploadedUrls[] = $url;
            }
            
            \Log::info('Uploaded image URLs:', ['urls' => $uploadedUrls]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Images uploaded successfully',
                'data' => [
                    'imageUrls' => $uploadedUrls
                ]
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload images: ' . $e->getMessage()
            ], 500);
        }
    }
} 