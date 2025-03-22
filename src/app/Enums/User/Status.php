<?php

namespace App\Enums\User;

enum Status: int
{
    case TEMPORARY = 1;
    case ACTIVE    = 2;
    case WITHDRAWN = 3;
}
