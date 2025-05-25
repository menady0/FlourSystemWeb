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
        Schema::create('quotas', function (Blueprint $table) {
            $table->id(); // QuotaID
            $table->float('Amount');
            $table->integer('AmountPerKG');
            $table->date('DateReceived');
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
        Schema::dropIfExists('quotas');
    }
};
