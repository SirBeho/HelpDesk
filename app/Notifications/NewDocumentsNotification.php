<?php

namespace App\Notifications;

use App\Mail\DocumentCreateMail;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewDocumentsNotification extends Notification
{
    use Queueable;

    protected $emailRecipient;

    public $numero_Task;
    public $name_documento;
    /**
     * Create a new notification instance.
     */
    public function __construct($emailRecipient, $numero_Task)
    {
        $this->emailRecipient = $emailRecipient;
        $this->numero_Task = $numero_Task;
 
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable)
    {
        return (new DocumentCreateMail($this->numero_Task, $this->name_documento))
            ->view('emails-templates.user-created')
            ->to($this->emailRecipient);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
