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
        Schema::create('customers', function (Blueprint $table) {
            $table->unsignedBigInteger('CustomerID')->primary();
            $table->string('OwnerName', 25);
            $table->tinyInteger('NumberOfPeople');
            $table->integer('TotalQuantity');
            $table->integer('Price');
            $table->tinyInteger('Registration');
            $table->integer('Delivered');
            $table->date('RenewalDate');
            $table->integer('customerIndex');
            $table->unsignedBigInteger('OwnerID')->nullable();
            $table->foreign('OwnerID')->references('id')->on('owners')->onDelete('set null')->onUpdate('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
