@component('mail::message')
Hello {{$userName}},  {{-- use double space for line break --}}
Thank you for requesting the Email Update. Your Verification Code is: {{$random_code}}.<br>
Sincerely,  
XecuteQuotes Team.
@endcomponent