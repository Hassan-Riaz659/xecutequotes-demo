@component('mail::message')
Hello {{$userName}},  {{-- use double space for line break --}}
Thank you for signing up with us! Click on the below link to verify your account: {{-- use double space for line break --}}
<a href="{{ url('/') }}/verify-account/{{$token}}">Click Here!</a> <br>
Sincerely,  
XecuteQuotes Team.
@endcomponent