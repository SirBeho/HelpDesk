<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DocumentCreateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $numero_task;
    public $nombre_documento;
    public function __construct($numero_task)
    {
        $this->numero_task = $numero_task;
    }

    public function build()
    {
        return $this->subject('Nuevo documento recibido')
            ->view('emails-templates.upload-document');
    }
}
