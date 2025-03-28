<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PaginateResource extends JsonResource
{
    /**
     * リソースを配列に変換
     *
     * @param  Request              $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'total'        => $this->resource->total(),
            'count'        => $this->resource->count(),
            'per_page'     => $this->resource->perPage(),
            'current_page' => $this->resource->currentPage(),
            'last_page'    => $this->resource->lastPage(),
        ];
    }
}
