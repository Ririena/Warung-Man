<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public $status;
    public $message;
    public $resource;

    /**
     * __construct
     *
     * @param  mixed $status
     * @param  mixed $message
     * @param  mixed $resource
     * @return void
     */
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
    }

    /**
     * toArray
     *
     * @param  mixed $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        $data = $this->resource;

        if ($data instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            $data->getCollection()->transform(function ($item) {
                $item->image = $item->image
                    ? asset('storage/' . $item->image)
                    : null;
                return $item;
            });
        }
        else {
            $data->image = $data->image
                ? asset('storage/' . $data->image)
                : null;
        }

        return [
            'success' => $this->status,
            'message' => $this->message,
            'data' => $data
        ];
    }

}
