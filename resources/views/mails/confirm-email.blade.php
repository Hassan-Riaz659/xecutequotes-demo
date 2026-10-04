@component('mail::message')
Hello {{$userName}},  {{-- use double space for line break --}}
Thank you for confirming your email! Click on the below link to verify your account: {{-- use double space for line break --}}
<a href="{{ url('/') }}/confrim-email/{{$token}}">Click Here!</a>
Sincerely,  
XecuteQuotes Team.
@endcomponent