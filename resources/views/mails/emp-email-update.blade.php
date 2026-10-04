@component('mail::message')
Hello User,  {{-- use double space for line break --}}
Thank you for signing up with us! Click on the below link to verify your account: {{-- use double space for line break --}}
<a href="{{ url('/') }}/emp-email-update/{{$token}}">Click Here!</a>
Sincerely,  
XecuteQuotes Team.
@endcomponent