<?php

namespace Database\Factories;

use App\Models\User;
use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'   => $this->faker->paragraph(1),
            'status'  => $this->faker->randomElement(
                TaskStatus::cases(),
            ),
            'user_id' => $this->faker->randomElement(User::all())->id,
        ];
    }
}
