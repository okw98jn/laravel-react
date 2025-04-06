<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class SuggestResource extends JsonResource
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
            'value' => $this->resource['value'],
            'label' => $this->resource['label'],
        ];
    }
}
