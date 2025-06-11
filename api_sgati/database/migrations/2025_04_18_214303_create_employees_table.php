<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->integer('id_employee', true);
            $table->integer('fk_location')->index('fk_employees_locations1_idx');
            $table->string('employee_userName', 100)->unique('employee_userName_unique');;
            $table->string('employee_name', 100);
            $table->string('employee_lastName', 100);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
