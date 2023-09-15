<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' =>$this->title,
            'author' =>$this->author,
            'news_content' =>$this->news_content,
            'img_product' =>$this->img_product,
            'created_at' =>date_format($this->created_at,"Y/m/d H:i:s")
        ];
    }
}
