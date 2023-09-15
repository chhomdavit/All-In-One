<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductModel::all();
        // return ProductResource::collection($products);

        return response()->json(["products" => $products]);
    }

    public function show($id)
    {
        $products = ProductModel::findOrFail($id);
        return new ProductDetailResource($products);
    }

    public function create(Request $request)
    {

        // $fileName = null;
        // $extension = null;
        $img_product= null;
        if($request->file){
            $fileName = $this->generateRandomString();
            $extension = $request->file->extension();
            $img_product =$fileName.'.'.$extension;

            Storage::putFileAs('public',$request->file, $img_product);

        }
        $request['img_product'] = $img_product;
        $products = ProductModel::create($request->all());
        return response()->json(["products" => $products]);
    }

    public function update(Request $request,$id)
    {
        $validated = $request->validate([
            'title' => 'required|max:225',
            'news_content' => 'required',
        ]);

        $products = ProductModel::findOrFail($id);
        $products ->update($request->all());

        // return new ProductDetailResource($products);
        return response()->json(["products" => $products]);
    }

    public function remove($id)
    {
        $products = ProductModel::findOrFail($id);
        $products ->delete();

        return response()->json(["products" => $products]);
    }

    function generateRandomString($length = 30) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

}
