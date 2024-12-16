<?php

namespace App;

enum TodoStatus: string
{
    case PENDING   = 'pending';
    case COMPLETED = 'completed';
}
