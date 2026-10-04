@component('mail::message')
Hello {{$userName}},  {{-- use double space for line break --}}
You requested to reset your password.{{-- use double space for line break --}}
<a href="{{ url('/') }}/reset-password/{{$token}}">Click Here to proceed!</a>
{{-- use double space for line break --}}
Sincerely,  
XecuteQuotes Team.
@endcomponent
